import { World } from './core/World';
import { CubeScene } from './scenes/CubeScene';
import ReactDOM from 'react-dom';
import React from 'react';
import { UiLayout } from './ui/UiLayout';

const world = new World(window.innerWidth, window.innerHeight);
world.scene = new CubeScene();

//Attach canvas
const canvasContainer = document.getElementById('canvas-container');
if (!canvasContainer) {
  throw new Error('Canvas container element was not found.');
}
canvasContainer.appendChild(world.canvasElement);

//Attach ui
const uiContainer = document.getElementById('ui-container');
if (!uiContainer) {
  throw new Error('UI container element was not found.');
}
ReactDOM.render(React.createElement(UiLayout, { world }), uiContainer);

//Setup render loop
const render = () => {
  requestAnimationFrame(render);
  world.render();
}
requestAnimationFrame(render);

//Handle window resize events
window.addEventListener('resize', () => world.setSize(window.innerWidth, window.innerHeight));
