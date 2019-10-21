<?php
namespace Sitegeist\Stencil\Grinder\Application\Controller;

/**
 * This file is part of the Sitegeist.Stencil.Grinder package
 *
 * (c) 2019
 * Wilhelm Behncke <behncke@sitegeist.de>
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Eel\FlowQuery\FlowQuery;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Neos\Domain\Repository\DomainRepository;
use Neos\Neos\Domain\Repository\SiteRepository;
use Neos\Neos\Domain\Model\Site;
use Neos\Neos\Domain\Service\ContentContextFactory;
use Neos\Neos\Controller\Exception\NodeNotFoundException;
use Neos\ContentRepository\Domain\Service\ContentDimensionCombinator;

use Sitegeist\Stencil\Grinder\Application\View\GrinderView;

/**
 * @Flow\Scope("singleton")
 */
class GrinderController extends ActionController
{
    /**
     * @var string
     */
    protected $defaultViewObjectName = GrinderView::class;

    /**
     * @var array
     */
    protected $supportedMediaTypes = ['application/x-sitegeist.stencil.grinder+json;version=v1'];

    /**
     * @Flow\Inject
     * @var DomainRepository
     */
    protected $domainRepository;

    /**
     * @Flow\Inject
     * @var SiteRepository
     */
    protected $siteRepository;

    /**
     * @Flow\Inject
     * @var ContentContextFactory
     */
    protected $contentContextFactory;

    /**
     * @Flow\Inject
     * @var ContentDimensionCombinator
     */
    protected $contentDimensionCombinator;

    /**
     * @param string $workspaceName Name of the workspace to set for the context
     * @param array $dimensions Optional list of dimensions and their values which should be set
     * @return ContentContext
     */
    protected function createContentContext($workspaceName, Site $site, array $dimensions = [])
    {
        $contextProperties = [
            'workspaceName' => $workspaceName,
            'invisibleContentShown' => false,
            'inaccessibleContentShown' => false,
            'removedContentShown' => false,
            'currentSite' => $site
        ];

        if ($dimensions !== []) {
            $contextProperties['dimensions'] = $dimensions;
            $contextProperties['targetDimensions'] = array_map(function ($dimensionValues) {
                return array_shift($dimensionValues);
            }, $dimensions);
        }

        return $this->contentContextFactory->create($contextProperties);
    }

    /**
     * @param string $filter
     * @return void
     */
    public function indexAction(string $filter = ''): void
    {
        //
        // Determine siteNodes
        //
        if ($domain = $this->domainRepository->findOneByActiveRequest()) {
            $site = $domain->getSite();
        } elseif ($site = $this->siteRepository->findDefault()) {
            $site = $site;
        } else {
            throw new \NodeNotFoundException('Could not find site.', 1571322200);
        }

        $siteNodes = [];
        $dimensionPresets = $this->contentDimensionCombinator->getAllAllowedCombinations();
        foreach ($dimensionPresets as $dimensionPreset) {
            $contentContext = $this->createContentContext('live', $site, $dimensionPreset);
            if ($siteNode = $contentContext->getNode(sprintf('/sites/%s', $site->getNodeName()))) {
                $siteNodes[] = $siteNode;
            }
        }

        //
        // Find all documentNodes that match $filter
        //
        $indexEntries = [];
        foreach ($siteNodes as $siteNode) {
            $q = new FlowQuery([$siteNode]);
            $indexEntries += $q->add($q->find('[instanceof Neos.Neos:Document]' . $filter))->get();
        }

        //
        // Set header
        //
        $this->response->setContentType('application/x-sitegeist.stencil.grinder+json;version=v1');

        //
        // Assign variables to view
        //
        $this->view->assignMultiple([
            'site' => $siteNodes[0],
            'node' => $siteNodes[0],
            'indexEntries' => $indexEntries
        ]);

        //
        // Set fusion path
        //
        $this->view->setFusionPath('grinder-index');
    }

    /**
     * @param NodeInterface $node
     * @return void
     */
    public function documentAction(NodeInterface $node): void
    {
        //
        // Get document node
        //
        $documentNode = $node;
        while ($documentNode !== null && !$documentNode->getNodeType()->isOfType('Neos.Neos:Document')) {
            $documentNode = $documentNode->findParentNode();
        }

        //
        // Get site node
        //
        $siteNode = $node->getContext()->getCurrentSiteNode();

        //
        // Set header
        //
        $this->response->setContentType('application/x-sitegeist.stencil.grinder+json;version=v1');

        //
        // Assign variables to view
        //
        $this->view->assignMultiple([
            'node' => $node,
            'documentNode' => $documentNode,
            'site' => $siteNode
        ]);

        //
        // Set fusion path
        //
        $this->view->setFusionPath('grinder');
    }

    /**
     * @param string $identifier
     * @param string $site
     * @param string $workspace
     * @param array $dimensions
     * @return void
     */
    public function nodeAction(string $identifier, string $site = '', string $workspace = 'live', array $dimensions = []): void
    {
        //
        // Get site
        //
        if ($site && ($site = $this->siteRepository->findOneByNodeName($site))) {
            $site = $site;
        } elseif ($domain = $this->domainRepository->findOneByActiveRequest()) {
            $site = $domain->getSite();
        } elseif ($site = $this->siteRepository->findDefault()) {
            $site = $site;
        } else {
            throw new \NodeNotFoundException('Could not find site.', 1571322200);
        }

        // Get contentContext
        $context = $this->createContentContext('live', $site, $dimensions);

        //
        // Get node
        //
        $node = $context->getNodeByIdentifier($identifier);

        //
        // Get document node
        //
        $documentNode = $node;
        while ($documentNode !== null && !$documentNode->getNodeType()->isOfType('Neos.Neos:Document')) {
            $documentNode = $documentNode->findParentNode();
        }

        //
        // Get site node
        //
        $siteNode = $node->getContext()->getCurrentSiteNode();

        //
        // Set header
        //
        $this->response->setContentType('application/x-sitegeist.stencil.grinder+json;version=v1');

        //
        // Assign variables to view
        //
        $this->view->assignMultiple([
            'node' => $node,
            'documentNode' => $documentNode,
            'site' => $siteNode
        ]);

        //
        // Set fusion path
        //
        $this->view->setFusionPath('grinder-node');
    }
}
