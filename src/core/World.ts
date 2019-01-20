import { Camera, PerspectiveCamera, Renderer, WebGLRenderer } from "three";
import { SceneContainer } from "./SceneContainer";

/**
 * Manages the Renderer, Camera, and Scene required to render to the canvas element.
 */
export class World {

  private camera: PerspectiveCamera;
  private renderer: Renderer;
  private _sceneContainer: SceneContainer | undefined;

  public constructor(width: number, height: number) {
    this.camera = new PerspectiveCamera(70, width / height, 0.01, 10);
    this.camera.position.z = 1;

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
  }

  public get canvasElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  /**
   * Gets the scene that is currently being rendered.
   */
  public get scene(): SceneContainer | undefined {
    return this._sceneContainer;
  }

  /**
   * Sets the scene to render.
   */
  public set scene(value: SceneContainer | undefined) {
    this._sceneContainer = value;
  }

  /**
   * Updates the size of the window. 
   * 
   * @param {number} width - The current width.
   * @param {number} height - The current height.
   */
  public setSize(width: number, height: number) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  /**
   * Updates the canvas element.
   */
  public render = () => {
    if (!this._sceneContainer) {
      return;
    }

    this._sceneContainer.onRender();
    this.renderer.render(this._sceneContainer.scene, this.camera);
  }
}
