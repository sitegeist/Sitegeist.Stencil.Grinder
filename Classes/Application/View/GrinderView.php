<?php
namespace Sitegeist\Stencil\Grinder\Application\View;

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
use Neos\Flow\I18n\Locale;
use Neos\Flow\I18n\Service as I18nService;
use Neos\Flow\Mvc\View\AbstractView;
use Neos\Neos\Domain\Service\FusionService;
use Neos\Fusion\Core\Runtime;

class GrinderView extends AbstractView
{
    /**
     * @Flow\Inject
     * @var FusionService
     */
    protected $fusionService;

    /**
     * @Flow\Inject
     * @var I18nService
     */
    protected $i18nService;

    /**
     * @var string
     */
    protected $fusionPath = 'grinder';

    /**
     * Renders the view
     *
     * @return string The rendered view
     * @api
     */
    public function render()
    {
        try {
            //
            // Create fusion runtime
            //
            $fusionRuntime = $this->fusionService->createRuntime($this->variables['site'], $this->controllerContext);
            $fusionRuntime->pushContextArray($this->variables);

            //
            // Initialize locale
            //
            $dimensions = $this->variables['node']->getContext()->getDimensions();
            if (array_key_exists('language', $dimensions) && $dimensions['language'] !== []) {
                $currentLocale = new Locale($dimensions['language'][0]);
                $this->i18nService->getConfiguration()->setCurrentLocale($currentLocale);
                array_shift($dimensions['language']);
                $this->i18nService->getConfiguration()->setFallbackRule(['strict' => true, 'order' => $dimensions['language']]);
            }

            //
            // Render
            //
            $output = $fusionRuntime->render($this->fusionPath);

            return json_encode($output);
        } catch (\Error $error) {
            return json_encode([
                'type' => 'Sitegeist.Stencil.Grinder/v1/Error',
                'payload' => [
                    'message' => $error->getMessage()
                ]
            ]);
        } catch (\Exception $exception) {
            return json_encode([
                'type' => 'Sitegeist.Stencil.Grinder/v1/Exception',
                'payload' => [
                    'code' => $exception->getCode(),
                    'message' => $exception->getMessage()
                ]
            ]);
        }
    }
}
