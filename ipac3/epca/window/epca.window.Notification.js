/**
 * 30.06.23 on; zvetsena velikost
 * 02.11.16 on; upravena animace, aby se neaktivoval scrollbar
 */
/*global Ext,epca,document*/
Ext.ns('epca.window');

epca.window.NotificationMgr = {
  positions: []
};

/**
 * Popup notifikacia
 * Volanie cez epca.notify
 */
epca.window.Notification = Ext.extend(Ext.Window, {
  initComponent: function() {
    Ext.apply(this, {
      //iconCls: this.iconCls || 'x-icon-information',
      //cls: 'x-notification',
      width: 300,
      autoHeight: true,
      plain: false,
      draggable: false,
      autoDestroy: true,
      hideDelay: epca.Config.notificationHideTime,
      bodyStyle: 'text-align:left'
    });
    if (this.autoDestroy) {
      this.task = new Ext.util.DelayedTask(this.hide, this);
    } else {
      this.closable = true;
    }
    epca.window.Notification.superclass.initComponent.call(this);
  },
  setMessage: function(msg) {
    this.body.update(msg);
  },
  setTitle: function(title, iconCls) {
    epca.window.Notification.superclass.setTitle.call(this, title, iconCls || this.iconCls);
  },
  onRender: function(ct, position) {
    epca.window.Notification.superclass.onRender.call(this, ct, position);
  },
  onDestroy: function() {
    epca.window.NotificationMgr.positions.remove(this.pos);
    epca.window.Notification.superclass.onDestroy.call(this);
  },
  cancelHiding: function() {
    this.addClass('fixed');
    if (this.autoDestroy) {
      this.task.cancel();
    }
  },
  afterShow: function() {
    epca.window.Notification.superclass.afterShow.call(this);
    Ext.fly(this.body.dom).on('click', this.cancelHiding, this);
    if (this.autoDestroy) {
      this.task.delay(this.hideDelay || 5000);
    }
  },
  animShow: function() {
    this.pos = 0;
    while (epca.window.NotificationMgr.positions.indexOf(this.pos) > -1) {
      this.pos++;
    }
    epca.window.NotificationMgr.positions.push(this.pos);
    // 30.06.23 on; zvetsena velikost
    //this.setSize(300, 100);
    this.setSize(500, 200);
    // 02.11.16 on; zmena 5 -> -5            v
    this.el.alignTo(document, "br-br", [-5, -5 - ((this.getSize().height + 10) * this.pos)]);
    this.el.slideIn('br', {
      duration: 1,
      callback: this.afterShow,
      scope: this
    });
  },
  animHide: function() {
    epca.window.NotificationMgr.positions.remove(this.pos);
    this.el.disableShadow();
    // 02.11.16 on; pouzito slideOut - aby se neaktivovaly scrollbary
    //this.el.ghost('br', {
    this.el.slideOut('br', {
      duration: 1,
      remove: true
    });
  },

  focus: Ext.emptyFn
});
