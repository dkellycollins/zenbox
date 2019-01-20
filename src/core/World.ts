import { Camera, PerspectiveCamera, Renderer, WebGLRenderer } from "three";
import { SceneContainer } from "./SceneContainer";
import ReactDOM from "react-dom";
import React from "react";
import { UiLayout } from "../ui/UiLayout";

/**
 * Manages the Renderer, Camera, and Scene required to render to the canvas element.
 */
export class World {

  private camera: PerspectiveCamera;
  private renderer: Renderer;
  private _sceneContainer: SceneContainer | undefined;
  private _canvasContainer: HTMLElement | undefined | null;
  private _uiContainer: HTMLElement | undefined | null;

  public constructor() {
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 1;

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => this.setSize(window.innerWidth, window.innerHeight));
  }

  /**
   * Attaches required elements to the dom and stars the rendering process.
   */
  public start = () => {
    this.canvasContainer.appendChild(this.renderer.domElement);

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      this.render();
    }
    requestAnimationFrame(renderFrame);
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
   * Gets the container element to attach the canvas element too.
   */
  private get canvasContainer(): HTMLElement {
    if (!this._canvasContainer) {
      const element = document.getElementById('canvas-container');
      if (!element) {
        throw new Error('Canvas container element was not found.');
      }
      this._canvasContainer = element;
    }
    
    return this._canvasContainer;
  }

  /**
   * Gets the container element to attach UI elements too.
   */
  private get uiContainer(): HTMLElement {
    if (!this._uiContainer) {
      const element = document.getElementById('ui-container');
      if (!element) {
        throw new Error('UI container element was not found.');
      }
      this._uiContainer = element;
    }

    return this._uiContainer;
  }

  /**
   * Updates the size of the window. 
   * 
   * @param {number} width - The current width.
   * @param {number} height - The current height.
   */
  private setSize(width: number, height: number) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  /**
   * Updates the canvas element.
   */
  private render = () => {
    if (this._sceneContainer) {
      this._sceneContainer.onRender();
      this.renderer.render(this._sceneContainer.scene, this.camera);
    }

    ReactDOM.render(React.createElement(UiLayout, { world: this }), this.uiContainer);
  }
}
