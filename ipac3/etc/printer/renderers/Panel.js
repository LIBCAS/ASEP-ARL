/**
 * @class Ext.ux.Printer.PanelRenderer
 * @extends Ext.ux.Printer.BaseRenderer
 * @author Ed Spencer
 *
 * 15.02.12 on; vytvoreno podle Ext.ux.Printer.GridPanelRenderer
 */

/**
 * Prints the contents of an Ext.Panel
 */
Ext.ux.Printer.PanelRenderer = Ext.extend(Ext.ux.Printer.BaseRenderer, {
  /**
   * Generates the HTML fragment that will be rendered inside the <html> element of the printing window
   */
  generateBody : function(panel) {
    return String.format("<div class='x-panel-print'>{0}</div>", panel.body.dom.innerHTML);
  }
});
Ext.ux.Printer.registerRenderer('panel', Ext.ux.Printer.PanelRenderer);
