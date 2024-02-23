/**
 * 21.07.16 on; podpora popup oken
 */
/*global epca, Ext, i3*/
Ext.ns('epca');
/**
 * Viewport, ktory moze obsahovat okno dizajnera, alebo evidencie
 * @param {Object} config
 */
epca.MainPanel = Ext.extend(Ext.Viewport, {
    changeableContentPanel: undefined,
    constructor: function(config) {
        config = config || {};
        Ext.apply(config, {
            layout: 'border',
            autoScroll: true, // 09.06.16 on; kvuli popup oknu
            items: [
                // 19.02.13 on; moznost prepsat
                {
                    region: 'north',
                    html: epca.Config.User.appHeader ? '<div class="main-viewport-header"><h1>' + epca.Config.User.appHeader + '</h1></div>' : '<div class="main-viewport-header"><h1>' + epca.L10n.txEPCA + '</h1></div>',
                    autoHeight: true,
                    border: false
                },
                this.getChangeableContentPanel()
            ]
        });
        epca.MainPanel.superclass.constructor.call(this, config);
    },
    getChangeableContentPanel: function() {
        if (!Ext.isDefined(this.changeableContentPanel)) {
            this.changeableContentPanel = new Ext.Panel({
                id: 'changeAbleContentPanel',
                region: 'center',
                layout: 'card',
                frame: false,
                border: false,
                activeItem: 0,
                items: [],
                setPanel: function(panel) {
                    this.removeAll(false);
                    this.add(panel);
                    this.layout.setActiveItem(panel);
                }
            });
        }
        return this.changeableContentPanel;
    }
});
