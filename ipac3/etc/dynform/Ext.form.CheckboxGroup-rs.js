/*
 * Alternative version. Robert Spiegel
 * Works for Checkboxgroup and Radiogroup
 * Changes (may be located by searching for the date of change):
 *
 * 22.10.13 on; rozsireno setValue pro radiogroup
 * 05.02.13 on; uprava CheckboxGroup
 * 08.04.10 on; pro verzi ext 3.x je nutne predefinovat getValue a setValue u RadioGroup
 * 21.04.09 rs; if no value selected return '' instead of null
 * --
 */
/*global Ext,window,alert */
// note: for quite strange reasons, I can't figure out yet,
// code formating to work correctly in Aptana
// text in code example bellow must be broken in 2 lines after '{'
/**
 * Add getValue() and setValue() for checkboxgroup and radiogroup.
 * Add support of checkbox & radiogroup for extract & populate.
 *
 * Required setup:
 *   1, checkboxgroup or radiogroup should have property 'nameSpace' and 'name'.
 *   2, all checkboxes or radios inside of the group should have 'inputValue' set
 *  Example:<code>
 ,xtype: 'checkboxgroup'
 ,items: [
 {
 boxLabel: 'Title', name: 'vipConfirmed',inputValue: 'title'},
 {
 boxLabel: 'Name', name: 'vipConfirmed',inputValue: 'name'},
 {
 boxLabel: 'Royalty', name: 'vipConfirmed',inputValue: 'royalty'}
 </code>

 */
Ext.override(Ext.form.CheckboxGroup, {
    /**
     * Get value for the cb/rb group.
     * May be used in Ext.form.FormPanel.extract()
     *
     * @return array of checked inputValues for the CheckBoxGroup, if only one value is checked it's
     *         returned as string. If no values a checked, null is returned.
     */
    getValue: function() {
        var value = [];
        this.items.each(function(c) { //           for each child
            if (c.getValue()) { //                  if checked use 'inputValue' as result
                value.push(c.inputValue);
                //          add in array
            }
        }, this);
        if (value.length === 0) { // no value checked
            return '';
            // 21.04.09 rs; if no value selected return '' instead of null
        }
        if (value.length === 1) { // exactly one value selected - return as string
            return value[0];
        }
        return value;
        // return as array (for cb group)
    },
    /**
     * Set value of the cb/rb group.
     * May be used in Ext.form.FormPanel.populate()
     *
     * @param {Object} pValue - value to be set
     *    1, null (clear all)
     *    2, one string value. Sets corresponding checkbox or radio.
     *    3, array of values. This only has sense for checkboxgroup.
     */
    setValue: function(pValue) {
        // If we passed string/null convert to array. Not very elegant, but simplifies processing.
        if (!Ext.isArray(pValue)) {
            pValue = [pValue];
        }
        // this does a loop for each value and each items. not very effective, but both arrays are expected to be small
        // should not be a issue here
        var processItem = function(c) { // for each child of the group
            var bCheck = false;
            // loop through passed array of values
            Ext.each(pValue, function(v) {
                if (c.inputValue === v) {
                    bCheck = true;
                }
            });
            c.setValue(bCheck);
        };
        if (this.items.each) {
            this.items.each(processItem);
        } else {
            // if we land here - field may be not rendered yet
            // 05.02.13 on; nastavi checkbox az po vytvoreni
            this.on('render', function() {
                if (this.items.each) {
                    this.items.each(processItem);
                }
            }, this);
        }
    }
});
/**
 *  08.04.10 on; pro verzi ext 3.x je nutne predefinovat getValue a setValue u RadioGroup
 *
 */
Ext.override(Ext.form.RadioGroup, {
    /**
     * Get value for the cb/rb group.
     * May be used in Ext.form.FormPanel.extract()
     *
     * @return array of checked inputValues for the CheckBoxGroup, if only one value is checked it's
     *         returned as string. If no values a checked, null is returned.
     */
    getValue: function() {
        var value = [];
        this.items.each(function(c) { //           for each child
            if (c.getValue()) { //                  if checked use 'inputValue' as result
                value.push(c.inputValue);
                //          add in array
            }
        }, this);
        if (value.length === 0) { // no value checked
            return '';
            // 21.04.09 rs; if no value selected return '' instead of null
        }
        if (value.length === 1) { // exactly one value selected - return as string
            return value[0];
        }
        return value;
        // return as array (for cb group)
    },
    /**
     * Set value of the cb/rb group.
     * May be used in Ext.form.FormPanel.populate()
     *
     * @param {Object} pValue - value to be set
     *    1, null (clear all)
     *    2, one string value. Sets corresponding checkbox or radio.
     *    3, array of values. This only has sense for checkboxgroup.
     */
    setValue: function(pValue) {
        // If we passed string/null convert to array. Not very elegant, but simplifies processing.
        if (!Ext.isArray(pValue)) {
            pValue = [pValue];
        }
        // this does a loop for each value and each items. not very effective, but both arrays are expected to be small
        // should not be a issue here
        var processItem = function(c) { // for each child of the group
            var bCheck = false;
            // loop through passed array of values
            Ext.each(pValue, function(v) {
                if (c.inputValue === v) {
                    bCheck = true;
                }
            });
            c.setValue(bCheck);
        };
        if (this.items.each) {
            this.items.each(processItem);
        } else {
            // if we land here - field may be not rendered yet
            // 22.10.13 on; nastavi radio az po vytvoreni
            this.on('render', function() {
                if (this.items.each) {
                    this.items.each(processItem);
                }
            }, this);
        }
    }
});
