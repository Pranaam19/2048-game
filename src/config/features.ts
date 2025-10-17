

export interface FeatureFlags {
  enableUndo: boolean;          
  enableMoveCounter: boolean;   
  enableTimer: boolean;         
  enableCombo: boolean;         
  enableHints: boolean;         
  enableKeyboardShortcuts: boolean; 
  enableAnimations: boolean;    
  enableSaveLoad: boolean;      
}


export const FEATURE_FLAGS: FeatureFlags = {
  enableUndo: false,
  enableMoveCounter: false,
  enableTimer: false,
  enableCombo: false,
  enableHints: false,
  enableKeyboardShortcuts: true,
  enableAnimations: false,
  enableSaveLoad: false,
};




