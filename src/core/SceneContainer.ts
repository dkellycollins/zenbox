import { Scene } from "three";

/**
 * Manages a single scene and any associated logic.
 */
export interface SceneContainer {

  /**
   * The scene instance.
   */
  readonly scene: Scene;

  /**
   * Callback to invoke before the scene is rendered.
   */
  onRender: () => void;
}
