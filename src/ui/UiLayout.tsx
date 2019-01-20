import React, { SFC } from 'react';
import { World } from '../core/World';
import { SceneContainer } from '../core/SceneContainer';

export interface UiLayoutProps {
  world: World;
}

export const UiLayout: SFC<UiLayoutProps> = ({ world }) => {
  return (
    <div style={{ color: 'white', margin: 20 }}>
      {renderSceneTitle(world.scene)}
    </div>
  );
}

const renderSceneTitle = (scene?: SceneContainer) => {
  if (scene) {
    return <span>{scene.title}</span>;
  }
  return <span>Loading...</span>;
}
