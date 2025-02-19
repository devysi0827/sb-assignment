export interface Square {
  hasBallon: boolean;
  isClicked: boolean;
}

export type GameState = 'proceed' | 'gameover' | 'complete';
