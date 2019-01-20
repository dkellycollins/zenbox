import { World } from './core/World';
import { CubeScene } from './scenes/CubeScene';

document.body.appendChild(World.instance.init());

const render = () => {
  requestAnimationFrame(render);
  World.instance.render();
}
requestAnimationFrame(render);

World.instance.scene = new CubeScene();
