//===============================================================================================//
// Chart values at SVG scale (where incisors and pre-molars and 300x300, for example)            //
//===============================================================================================//
// teeth - numbers
const NUM_MOLARS_QUADRANT = 3;
const NUM_PREMOLARS_QUADRANT = 2;
const NUM_INCISORS_QUADRANT = 3;
const NUM_TEETH_QUADRANT = NUM_MOLARS_QUADRANT + NUM_PREMOLARS_QUADRANT + NUM_INCISORS_QUADRANT;

// teeth - dimensions
const INCISOR_WIDTH = 300;
const INCISOR_HEIGHT = 300;
const PREMOLAR_WIDTH = 300; 
const PREMOLAR_HEIGHT = 300;
const MOLAR_WIDTH = 400;
const MOLAR_HEIGHT = 300;

// spacing
const EDGE_SPACING = 20;
const TOOTH_SPACING = 20;
const MIDLINE_SPACING = 100;

// quadrant is the teeth including inner spacing (i.e. horizontally between teeth)
const QUADRANT_WIDTH = (INCISOR_WIDTH * NUM_INCISORS_QUADRANT)
    + (PREMOLAR_WIDTH * NUM_PREMOLARS_QUADRANT) + (MOLAR_WIDTH * NUM_MOLARS_QUADRANT)
    + (TOOTH_SPACING * (NUM_TEETH_QUADRANT - 1));

// chart width includes teeth, spaces between the teeth and midline and edge spacing
const CHART_WIDTH = (QUADRANT_WIDTH * 2) + (EDGE_SPACING * 2) + MIDLINE_SPACING;

//===============================================================================================//
// Drawing and handling                                                                          //
//===============================================================================================//
/**
 * Draws the teeth and midlines on a given Snap SVG object
 */
svg_setup = function (svg) {
    return;
}

/**
 * Initialise svg and listeners
 */
window.onload = function () {
    return;
}
