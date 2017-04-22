function DentalChart(paper) {
    // teeth - numbers
    this.NUM_MOLARS_QUADRANT = 3;
    this.NUM_PREMOLARS_QUADRANT = 2;
    this.NUM_INCISORS_QUADRANT = 3;
    this.NUM_TEETH_QUADRANT = this.NUM_MOLARS_QUADRANT + this.NUM_PREMOLARS_QUADRANT
        + this.NUM_INCISORS_QUADRANT;

    // teeth - dimensions
    this.INCISOR_WIDTH = 300;
    this.PREMOLAR_WIDTH = 300;
    this.MOLAR_WIDTH = 400;
    this.TOOTH_HEIGHT = 300;

    // spacing
    this.EDGE_SPACING = 20;
    this.TOOTH_SPACING = 20;
    this.MIDLINE_SPACING = 100;

    // quadrant is the teeth including inner spacing (i.e. horizontally between teeth)
    this.QUADRANT_WIDTH = (this.INCISOR_WIDTH * this.NUM_INCISORS_QUADRANT)
        + (this.PREMOLAR_WIDTH * this.NUM_PREMOLARS_QUADRANT)
        + (this.MOLAR_WIDTH * this.NUM_MOLARS_QUADRANT)
        + (this.TOOTH_SPACING * (this.NUM_TEETH_QUADRANT - 1));

    // chart width includes teeth, spaces between the teeth and midline and edge spacing
    this.CHART_WIDTH = (this.QUADRANT_WIDTH * 2) + (this.EDGE_SPACING * 2) + this.MIDLINE_SPACING;

    // chart height is two sets of teeth, midline and edge spacing
    this.CHART_HEIGHT = (this.TOOTH_HEIGHT * 2) + (this.EDGE_SPACING * 2) + this.MIDLINE_SPACING;

    // expected to be the whole SVG
    this.paper = paper;

    /**
     * Draws a molar (scale 400x300 with mid-line). Returns group containing all groups drawn.
     * @param {Paper} paper Snap.SVG paper object
     * @param {int} originX Top left point X coordinate in global system
     * @param {int} originY Top left point Y coordinate in global system
     * @param {string} zpToothId Zsigmondy-Palmer notation tooth ID - used as prefix for elements
     */
    this.drawPreMolar = function (originX, originY, zpToothId) {
        var preMolarGroup = this.paper.group();
        preMolarGroup.attr({ id: zpToothId });
        preMolarGroup.transform(
            Snap.format('translate({x},{y})', {
                x: originX,
                y: originY
            })
        );

        // For each surface, draw the shape and give it an ID
        // Occlusal: like, the top
        var occlusal = this.paper.rect(
            0.25 * this.PREMOLAR_WIDTH, 0.25 * this.TOOTH_HEIGHT,
            0.5 * this.PREMOLAR_WIDTH, 0.5 * this.TOOTH_HEIGHT
        );
        occlusal.attr({
            id: zpToothId + '-occlusal'
        });

        // Buccal: by the cheek
        var buccal = this.paper.polygon(
            0, 0,
            this.PREMOLAR_WIDTH, 0,
            0.75 * this.PREMOLAR_WIDTH, 0.25 * this.TOOTH_HEIGHT,
            0.25 * this.PREMOLAR_WIDTH, 0.25 * this.TOOTH_HEIGHT
        );
        buccal.attr({
            id: zpToothId + '-buccal'
        });

        // Mesial: towards the front
        var mesial = this.paper.polygon(
            this.PREMOLAR_WIDTH, 0,
            this.PREMOLAR_WIDTH, this.TOOTH_HEIGHT,
            0.75 * this.PREMOLAR_WIDTH, 0.75 * this.TOOTH_HEIGHT,
            0.75 * this.PREMOLAR_WIDTH, 0.25 * this.TOOTH_HEIGHT
        );
        mesial.attr({
            id: zpToothId + '-mesial'
        });

        // Palatal: by the roof of the mouth (upper only)
        var palatal = this.paper.polygon(
           this.PREMOLAR_WIDTH, this.TOOTH_HEIGHT,
            0, this.TOOTH_HEIGHT,
            0.25 * this.PREMOLAR_WIDTH, 0.75 * this.TOOTH_HEIGHT,
            0.75 * this.PREMOLAR_WIDTH, 0.75 * this.TOOTH_HEIGHT
        );
        palatal.attr({
            id: zpToothId + '-palatal'
        });

        var distal = this.paper.polygon(
            0, this.TOOTH_HEIGHT,
            0, 0,
            0.25 * this.PREMOLAR_WIDTH, 0.25 * this.TOOTH_HEIGHT,
            0.25 * this.PREMOLAR_WIDTH, 0.75 * this.TOOTH_HEIGHT
        );
        distal.attr({
            id: zpToothId + '-distal'
        });

        preMolarGroup.add([occlusal, buccal, mesial, palatal, distal])
    };

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
    var dentalChart = new DentalChart(chartPaper);

    // viewbox actually needs to be set on HTML element - fixable?
    /*chartPaper.attr({
        viewbox: '0 0 ' + dentalChart.CHART_WIDTH + ' ' + dentalChart.CHART_HEIGHT
    });*/

    dentalChart.drawPreMolar(0, 0, 'ur8');
}
