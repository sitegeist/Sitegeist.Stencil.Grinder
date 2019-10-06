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
use Neos\ContentRepository\Domain\Model\NodeInterface;

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
     * @param NodeInterface $node
     * @return void
     */
    public function showAction(NodeInterface $node): void
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
    }
}
