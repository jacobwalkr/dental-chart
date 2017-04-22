var DentalChart = function () {
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
    // SVG elements to include in main "canvas"                                                      //
    //===============================================================================================
    /**
     * Draws a molar (scale 400x300 with mid-line). Returns group containing all groups drawn.
     * @param {Paper} paper Snap.SVG paper object
     * @param {int} originX Top left point X coordinate in global system
     * @param {int} originY Top left point Y coordinate in global system
     * @param {string} zpToothId Zsigmondy-Palmer notation tooth ID - used as prefix for elements
     */
    this.drawPreMolar = function (paper, originX, originY, zpToothId) {
        var preMolarGroup = paper.group();
        preMolarGroup.attr({ id: zpToothId });
        preMolarGroup.transform(
            Snap.format('translate({x},{y})', {
                x: originX,
                y: originY
            })
        );

        // For each surface, draw the shape and give it an ID
        // Occlusal: like, the top
        var occlusal = paper.rect([
            0.25 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT,
            0.5 * PREMOLAR_WIDTH, 0.5 * PREMOLAR_HEIGHT
        ]);
        occlusal.attr({
            id: zpToothId + '-occlusal'
        });

        // Buccal: by the cheek
        var buccal = paper.polygon([
            0, 0,
            PREMOLAR_WIDTH, 0,
            0.75 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT,
            0.25 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT
        ]);
        buccal.attr({
            id: zpToothId + '-buccal'
        });

        // Mesial: towards the front
        var mesial = paper.polygon([
            0, 0,
            PREMOLAR_WIDTH, 0,
            0.75 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT,
            0.25 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT
        ]);
        mesial.attr({
            id: zpToothId + '-mesial'
        });

        // Palatal: by the roof of the mouth (upper only)
        var palatal = paper.polygon([
            0, 0,
            PREMOLAR_WIDTH, 0,
            0.75 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT,
            0.25 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT
        ]);
        palatal.attr({
            id: zpToothId + '-palatal'
        });

        var distal = paper.polygon([
            0, 0,
            PREMOLAR_WIDTH, 0,
            0.75 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT,
            0.25 * PREMOLAR_WIDTH, 0.25 * PREMOLAR_HEIGHT
        ]);
        distal.attr({
            id: zpToothId + '-distal'
        });
    };

    //===============================================================================================//
    // Drawing and handling                                                                          //
    //===============================================================================================//
    /**
     * Draws the teeth and midlines on a given Snap SVG object
     */
    svgSetup = function (svg) {
        return;
    }
}

/**
 * Initialise svg and listeners
 */
window.onload = function () {
    var chartPaper = Snap('#chart');
}
