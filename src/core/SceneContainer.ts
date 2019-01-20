import { Scene } from "three";

/**
 * Manages a single scene and any associated logic.
 */
export interface SceneContainer {

  /**
   * The title of the Scene to display in the UI.
   */
  readonly title: string;

  /**
   * The scene instance.
   */
  readonly scene: Scene;

  /**
   * Callback to invoke before the scene is rendered.
   */
  onRender: () => void;
}
