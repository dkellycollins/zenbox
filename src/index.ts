import { World } from './core/World';
import { CubeScene } from './scenes/CubeScene';

const world = new World();
world.scene = new CubeScene();

world.start();
