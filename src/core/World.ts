import { Camera, PerspectiveCamera, Renderer, WebGLRenderer } from "three";
import { SceneContainer } from "./SceneContainer";

/**
 * Manages the Renderer, Camera, and Scene required to render to the canvas element.
 */
export class World {

  /**
   * The singleton instance of the World.
   */
  public static instance = new World();

  private camera: Camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  private renderer: Renderer = new WebGLRenderer({ antialias: true });
  private _sceneContainer: SceneContainer | undefined;

  /**
   * Sets up required assets and returns the canvas elements that scenes will be rendered too.
   * 
   * @returns {HTMLCanvasElement} - The canvas element that should be appended to the document.
   */
  public init = () => {
    this.camera.position.z = 1;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

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
