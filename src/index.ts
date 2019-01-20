import { World } from './core/World';
import { CubeScene } from './scenes/CubeScene';
import ReactDOM from 'react-dom';
import React from 'react';
import { UiLayout } from './ui/UiLayout';

const canvasContainer = document.getElementById('canvas-container');
if (!canvasContainer) {
  throw new Error('Canvas container element was not found.');
}

canvasContainer.appendChild(World.instance.init());

const render = () => {
  requestAnimationFrame(render);
  World.instance.render();
}
requestAnimationFrame(render);

World.instance.scene = new CubeScene();

const uiContainer = document.getElementById('ui-container');
if (!uiContainer) {
  throw new Error('UI container element was not found.');
}

ReactDOM.render(React.createElement(UiLayout, { world: World.instance }), uiContainer);
