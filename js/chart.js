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

    // draw the chart!
    // e = edge, m = molar, p = premolar, i = incisor, l = midline
    var arch = "emememepepeieieilieieiepepememem".split('');
    var ys = [20, 420];

    for (yi in ys) {
        var y = ys[yi];
        var from_left = 0;

        for (item in arch) {
            var target;

            switch (arch[item]) {
                // test the spaces first
                case 'e':
                    from_left += this.EDGE_SPACING;
                    continue;
                case 'l':
                    from_left += this.MIDLINE_SPACING;
                    continue;
                // not a space? congratulations! it's a tooth!
                case 'm':
                    target = 'molar.svg';
                    this_x = from_left;
                    from_left += this.MOLAR_WIDTH;
                    break;
                case 'p':
                    target = 'premolar.svg';
                    this_x = from_left;
                    from_left += this.PREMOLAR_WIDTH;
                    break;
                case 'i':
                    target = 'incisor.svg';
                    this_x = from_left;
                    from_left += this.INCISOR_WIDTH;
                    break;
            }

            if (target === undefined) {
                continue;
            }

            Snap.load('svg/' + target, function (frag) {
                var group = frag.select('g');

                group.transform(Snap.format('translate({x},{y})', {
                    x: this.x,
                    y: this.y
                }));

                this.paper.append(group);
            }, {
                paper: this.paper,
                x: this_x,
                y: y
            });
        }
    }

    // register a click event
    this.paper.click(function (event) {
        event.target.style.fill = 'red';
    })
}

/**
 * Initialise svg and listeners
 */
window.onload = function () {
    var chartPaper = Snap('#chart');
    var dentalChart = new DentalChart(chartPaper);
}
