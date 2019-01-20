import { Scene, BoxGeometry, MeshNormalMaterial, Mesh } from "three";
import { SceneContainer } from "../core/SceneContainer";

/**
 * Scene that contains a single spining cube.
 */
export class CubeScene implements SceneContainer {

  private readonly geometry = new BoxGeometry(0.2, 0.2, 0.2);
  private readonly material = new MeshNormalMaterial();
  private readonly mesh = new Mesh(this.geometry, this.material);
  private readonly _scene = new Scene();

  public constructor() {
    this._scene.add(this.mesh);
  }

  public readonly title = 'Cube';

  public get scene(): Scene {
    return this._scene;
  }

  public onRender() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
  }

}
