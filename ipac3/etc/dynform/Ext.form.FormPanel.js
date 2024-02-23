/*
 * Changes (may be located by searching for the date of change):
 *
 * 08.12.21 on; podpora treepanelu v populate
 * 26.11.21 on; nastaveni velikost textarea
 * 31.08.16 on; osetren zapis prazdneho pole do dyntriggeru
 * 10.04.14 on; osetrena neexistence fieldsetu
 * 30.07.13 on; uprava populate
 * 21.03.13 on; rozisreni aggregate
 * 18.02.13 on; v metode setValues zruseno vyvolani udalosti "change"
 * 09.11.12 on; v metode setValues doplneno vyvolani udalosti "change"
 * 20.08.12 on; pridana ikona minus do prvniho fieldsetu
 * 23.05.12 on; oprava ztraceni poli csNotPresentedFields
 * 29.02.12 on; opravena chyba
 * 30.01.12 on; osetreno ztraceni poli ve fieldsetech
 * 30.11.11 on; rozsirena metoda extract
 * 31.05.11 on; rozsireni populate
 * 21.10.10 on; osetrena chyba v setValues
 * 28.08.09 rs; added possibility for findFormComponents to specify blank 'ns'
 *              this will find components for all namespaces
 * 20.05.09 rs; fix undefined variable
 * 12.05.09 rs; added doLayout after setup of the number of the clones
 * 21.04.09 rs; extract on fields returning objects will pack data in array envelope (see more description below)
 * 21.04.09 rs; method populate() split into 3 methods (previously sepparate internal functions are now methods)
 *              fixed code for jslint
 *              populate() now has third parameter options - see description.
 * --
 */
/*global Ext,window,alert,i3 */
Ext.override(Ext.form.FormPanel, {
    /**
     * Returns array of component under this panel
     * @param {String} ns  Optional namespace to which the component should be bound
     *                     if ns is null, components in any namespace will be returned
     *                     (28.08.09 rs; added possibility of blank ns)
     * @param {String} xtype Required type of component
     * @param {String} master Optional  identifier whether the component shouldn't be a clone If master is not empty, the component can't be a clone
     * @return {Array}
     */
    findFormComponents: function(ns, xtype, master) {
        var bAnyNS = Ext.isEmpty(ns);
        // T/F if namespace was specified
        if (Ext.isEmpty(master)) {
            return this.findBy(function(cmp) {
                return cmp.isXType(xtype) && (bAnyNS || (cmp.nameSpace === ns));
            });
        }
        return this.findBy(function(cmp) {
            // 20.08.12 on; pridana ikona minus do prvniho fieldsetu - master se nepozna podle template
            //return cmp.isXType(xtype) && Ext.isEmpty(cmp.template) && (bAnyNS || (cmp.nameSpace === ns));
            return cmp.isXType(xtype) && (!cmp.clone) && (bAnyNS || (cmp.nameSpace === ns));
        });
    },
    /**
     * Adds value to collection In case of single value collection a single value is returned Otherwise an array of values will be returned
     * @param {Mixed}  coll  Required collection to which the value should be added
     * @param {String}  v Required value that should be added to the collection
     * @return Returns mixed elements of collection
     */
    aggregate: function(coll, v) {
        // 07.12.20 on; prazdne retezce vynechat - zatim nepouzito
        /*if (v==='') {
          if ((coll === undefined) || (coll === null)) {
            coll = '';
          }
          return coll;
        }*/
        if (coll === undefined || coll === null) {
            // 21.03.13 on; pokud getValue() vratila pole (to je pripad komponenty cs_checkboxgroup_st), nebudeme to ohranicovat dalsim polem
            if (Ext.isArray(v)) {
                return v;
            }
            // 21.04.09 rs; if 'v' is object then make array envelope around it
            //              this is for fields, which on getvalue return objects, not string
            //              we want resulting data structure same as for fieldset (so even 1 member fieldset
            //              returns one member array
            if (typeof v === 'object') {
                return [v];
            }
            return v;
        }
        if (Ext.isArray(coll)) {
            coll.push(v);
            return coll;
        }
        // 07.12.20 on; prazdne retezce prepsat - zatim nepouzito
        //if (coll==='') {
        //  coll = v;
        //} else {
        coll = [coll];
        coll.push(v);
        //}
        return coll;
    },
    /**
     * Extract value(s) of all component under this panel that are bound to a named collection.
     * If xtype is field an object of field names and aggregated values is returned
     * If xtype is fieldset an array of objects of field names and aggregated values, each object representing a fieldset, is returned
     *
     * @param {String} ns  Required namespace to which the component should be bound
     * @param {String} pXtype Required type of component
     * @return Returns object in case xtype is field and returns array in case xtype is fieldset
     *
     * Example of it's usage:<code>
     *   var location = Ext.getCmp('panel').extract('location','field');
     *   var fsperson = Ext.getCmp('panel').extract('person','fieldset');
     *   var fperson = Ext.getCmp('panel').extract('person','field');</code>
     */
    extract: function(ns, pXtype) {
        if (pXtype === 'fieldset') {
            var fieldSets = this.findFormComponents(ns, pXtype);
            var obja = [];
            Ext.each(fieldSets, function(fst) {
                var prop, obj = {};
                var fs = fst.findBy(function(cmp) {
                    return cmp.isFormField;
                });
                Ext.each(fs, function(f) {
                    obj[f.name] = this.aggregate(obj[f.name], f.getValue());
                }, this);
                // 30.01.12 on; vrati do zaznamu pole, ktera nejsou definovana ve fieldsetu na formulari
                if (fst.csNotPresentedFields && (!i3.isEmptyObj(fst.csNotPresentedFields))) {
                    // Go through all the properties of the passed-in object
                    for (prop in fst.csNotPresentedFields) {
                        if (fst.csNotPresentedFields[prop] !== '') {
                            // policka, ktera nejsou na formualari
                            obj[prop] = fst.csNotPresentedFields[prop];
                        }
                    }
                }
                obja.push(obj);
            }, this);
            return obja;
        }
        if (pXtype === 'field') {
            var fields = this.findFormComponents(ns, pXtype);
            var obj = {};
            Ext.each(fields, function(f) {
                obj[f.name] = this.aggregate(obj[f.name], f.getValue());
            }, this);
            // 30.11.11 on; toto neni moc stastne, ale nenasel jsem jinou moznost, jak pridat typu 'field' treepanel
            fields = this.findFormComponents(ns, 'treepanel');
            Ext.each(fields, function(f) {
                obj[f.name] = this.aggregate(obj[f.name], f.getValue());
            }, this);
            return obj;
        }
        // this alert may be commented out, if it gets in the way
        window.alert('Ext.form.FormPanel.extract: invalid value for pXtype=' + pXtype);
    },
    // ******************************************************************************************
    // populate *********************************************************************************
    // ******************************************************************************************
    /**
     * (Private method used in populate())
     * Find master field by name inside of a fieldset or inside of array of fields.
     *
     * @param {Object} pMulti  - array of fields or container with fields (fieldset)
     * @param {Object} pName   - field which we are searching for;
     *                           may be literal '*' (selects all master fields in fieldset)
     */
    findField: function(pMulti, pName) {
        var fields = [];
        if (Ext.isArray(pMulti)) {
            // find field in array of fields based on it's name
            Ext.each(pMulti, function(field) {
                if ((!Ext.isEmpty(field.template)) || (!field.isFormField)) { // skip
                    return true;
                }
                if (((field.dataIndex === pName) || (field.id === pName) || (field.name === pName))) {
                    fields.push(field);
                    // take this one
                }
            }, this);
        } else {
            // find field under this component based on it's name
            fields = pMulti.findBy(function(cmp) {
                // if it is clone or no a form field, skip
                if ((!Ext.isEmpty(cmp.template)) || (!cmp.isFormField)) {
                    return false;
                }
                if ((pName === '*') || (cmp.dataIndex === pName) || (cmp.id === pName) || (cmp.name === pName)) {
                    return true;
                }
            });
        }
        if (pName === '*') {
            return fields;
        } // return array 1:1
        // searched for name & something were found?
        if (fields.length > 0) {
            return fields[0];
        }
        return null;
        // not found
    },
    /**
     * (Private method used in populate())
     * Receives array of fields and corresponding array of values to be set.
     *
     * @param {Object} pFields   - array of fields (usually master+clones)
     * @param {Object} pValues   - corresponding array of values to be set
     */
    setValues: function(pFields, pValues) {
        if (Ext.isEmpty(pValues)) {
            pValues = '';
        }
        if (!Ext.isArray(pValues)) {
            pValues = [pValues];
        }
        // acquire required amount of fields
        if (!Ext.isArray(pFields)) {
            var fldMaster = pFields;
            // given field will be master field
            pFields = [fldMaster];
            // convert into array
            // 21.04.09 rs; we only create clones if "clones" member function is present & if dynamic option is set
            //              (checkboxgroup has "clones" bud has not "dymanic" set to true)
            if (fldMaster.clones && fldMaster.dynamic) { // if field is dynamic, then setup right amount of clones
                pFields = pFields.concat(fldMaster.clones(pValues.length - 1));
            }
        }
        // this is special case, where field is not dynamic, but receives more than one value
        // currently only occurs for checkboxgroup
        // ?? not very elegant - may need rewrite in the future
        if ((pFields.length === 1) && (pValues.length > 1)) {
            pFields[0].setValue(pValues);
            return;
        }
        // populate fields
        var i;
        for (i = 0; i < pValues.length; i++) {
            // 21.10.10 on; pokud byl zapojeny combobox, ktery mel store === null, tak tu tady padalo
            if ((pFields[i].xtype === 'cs_combo_st') && (pFields[i].store === null)) {
                continue;
            }
            pFields[i].setValue(pValues[i]);
            // 18.02.13 on; pro checkboxgroup ma change event jine parametry - zatim to ale nepotrebuju, takze akorat se se nebude pro checkboxgroup volat
            // 09.11.12 on; rucne vyvola udalost zmeny - odchytam to napr. v interpi aplikaci USA5517
            // pokud by s tim byly problemy, muzu tu vyvolat nejakou jinou udalost
            if (pFields[i].xtype !== 'checkboxgroup') {
                pFields[i].fireEvent('change', pFields[i], pValues[i]);
            }
            // 26.11.21 on; nastavi velikost pole
            if (pFields[i].xtype === 'textarea') {
                pFields[i].autoSize();
            }
        }
    },
    // note: for quite strange reasons, I can't figure out yet,
    // code formating to work correctly in Aptana
    // text in code example bellow must be broken in 2 lines after '{'
    /**
     * Populate panel components bound to a named collection.
     *
     * If xtype is field:
     *   populating is based on an object of field names and aggregated values. That is used to set
     *   the values of the components under this panel.
     * If xtype is fieldset:
     *   populating is based on an array of objects of field names and aggregated values, each object
     *   representing a fieldset, that is used to set the values of the components under this panel.
     *
     * @param {Mixed}  pInputData  Required. Values used for populating the fields
     * @param {String} pNamespace  Required. Namespace to which the component should be bound
     * @param {String} pXtype Required. Type of component
     * @param {Object} pOptions Optional. Options.
     *   Currently supported values:
     *      setupAll - true:  Always process all fields in specified namespace
     *                 false: Only the fields which are present in input data are processed. This is default.
     *                        Similar behaviour as Ext.form.BasicForm.setValues.
     *      warnings - true:  Show warnings on invalid parameters. Default.
     *                 false: Ignore errors.
     *
     * Example of it's usage :<pre><code>
     *   person.populate({
     *        "state": ["Netherlands", "Delaware"] }, 'location', 'field');
     *   person.populate([{
     *        "first":["Adriaan","Cornelis"],"last":"Zaanen"}, {
     *        "first":["Bill"],"last":"Joy"}], 'person', 'fieldset');
     *   person.populate({
     *        "birthDate":"03/12/2009"}, 'person', 'field');
     *     </code></pre>
     *
     * Known restrictions :
     * 1.   Only one type of dynamic fieldset per namespace allowed Therefore populating fieldsets of different types is not allowed.
     * 2.  Dynamic is not supported on checkboxgroup and radiogroup
     *
     * Known defects :
     * 1.  Dynamic fields of a dynamic fieldset are not removed! Therefore person.populate(Ext.decode('[ ]),'person','fieldset'); will NOT remove first:Cornelist.
     *
     * changes
     * 31.05.11 on; doplneny parametr csSubfieldsOnly, ktery umozni dotazeni vice opakovani fieldsetu do jednoho tagu
     * 21.04.09 rs; support for cb/rb groups; formal changes
     */
    populate: function(pInputData, pNamespace, pXtype, pOptions) {
        var name, field, fields, values, i;
        pOptions = pOptions || {};
        Ext.applyIf(pOptions, {
            warnings: true
        });
        if (pXtype === 'fieldset') {
            if (!pInputData) { // 12.05.09 rs; added default
                pInputData = [];
            }
            if (!Ext.isArray(pInputData)) {
                // this alert may be commented out, if it gets in the way
                if (pOptions.warnings) {
                    window.alert('Ext.form.FormPanel.populate: input should be array!');
                }
                return;
                // input should be a array
            }
            // restrictions :
            //   Only one dynamic fieldset per namespace allowed
            // find all master components in give namespace of specified xtype (here 'fieldset') in current panel
            var fieldsets = this.findFormComponents(pNamespace, pXtype, 'master');
            // 10.04.14 on; pridana kontrola (dany fieldset nemusi na formulari existovat)
            if (fieldsets.length === 0) {
                return;
            }
            // currently we only support one fieldset/namespace, so we only work with fieldsets[0]
            // first we check, whenewer the fieldset is dynamic (if it has method 'clones')
            if (fieldsets[0].clones) {
                // some clones of given fieldset are present
                if (pInputData.length === 0) {
                    // input data has no repetitions, so discard any previously opened clones
                    fieldsets[0].clones(0);
                } else {
                    // set requested amount of fieldset clones
                    // then concat master fieldset with the fs-clones
                    if (fieldsets[0].csSubfieldsOnly) {
                        // 27.05.11 on; vyjimka pro fieldset v ramci tagu
                        fieldsets[0].clones(0);
                    } else {
                        fieldsets = fieldsets.concat(fieldsets[0].clones(pInputData.length - 1));
                    }
                }
            }
            // fix if there are no input data, simulate one blank item
            // may be usefull to cleanup the fieldset
            if (!pInputData.length) {
                pInputData = [{}];
            }
            // 12.05.09 rs; added doLayout after setup of the number of the clones
            //              this will render the fields inside of the cloned fieldsets
            //              else we would not be able do the setValue() calls (problem was with checkboxgroup-s)
            this.doLayout();
            // 27.05.11 on; vyjimka pro fieldset v ramci tagu
            if (fieldsets[0].csSubfieldsOnly) {
                Ext.each(pInputData, function(pInputD1) {
                    // 29.02.12 on; pInputD1 nesmim menit, musim si ho zkopirovat
                    var oInput1 = i3.c.cloneObject(pInputD1);
                    //var currentFldSet = fieldsets[i];
                    var nMax = 0;
                    // get all master fields under current fieldset
                    fields = this.findField(fieldsets[0], '*');
                    // for all master fields in current fieldset
                    Ext.each(fields, function(pField) {
                        values = pInputD1[pField.name];
                        //         data to be set-up (may be null)
                        if ((Ext.isArray(values)) && (values.length > nMax)) {
                            nMax = values.length;
                        }
                    });
                    if (nMax > fieldsets.length) {
                        fieldsets = fieldsets.concat(fieldsets[0].clones(nMax - fieldsets.length));
                        this.doLayout();
                    }
                    Ext.each(fieldsets, function(currentFldSet, i) {
                        var prop;
                        fields = this.findField(currentFldSet, '*');
                        // for all master fields in current fieldset
                        Ext.each(fields, function(pField) {
                            values = pInputD1[pField.name];
                            //         data to be set-up (may be null)
                            if (!values) { //                        fix for null
                                values = '';
                            }
                            if (!Ext.isArray(values)) {
                                values = [values];
                            }
                            this.setValues(pField, values[i]);
                            //        setup values for any case (even if not present in input data)
                            // 29.02.12 on; musi mazat obsah pomocneho objektu
                            // 30.01.12 on; smaze obsah podpole v pInputD1, abych vedel, ze bylo uz vlozeno do formulare
                            //pInputD1[pField.name] = '';
                            oInput1[pField.name] = '';
                        }, this);
                        // 29.02.12 on; projde pomocny objekt
                        // 30.01.12 on; ted jeste projde pres vsechny pole v zaznamu a pokud nektere jeste nebylo do fieldsetu vlozeno,
                        //              ulozi si ho
                        // Go through all the properties of the passed-in object
                        currentFldSet.csNotPresentedFields = {};
                        // 23.05.12 on; presunuto pred cyklus, protoze si mazal vice vyskytu pole
                        for (prop in oInput1) {
                            if (oInput1[prop] !== '') {
                                // 23.05.12 on; presunuto pred cyklus, protoze si mazal vice vyskytu pole
                                // policka, ktera nejsou na formulari
                                //currentFldSet.csNotPresentedFields = {};
                                currentFldSet.csNotPresentedFields[prop] = oInput1[prop];
                            }
                        }
                    }, this);
                }, this);
            } else {
                // now for all repetitions of input data
                Ext.each(pInputData, function(pInputD1, i) {
                    var prop;
                    // 29.02.12 on; pInputD1 nesmim menit, musim si ho zkopirovat
                    var oInput1 = i3.c.cloneObject(pInputD1);
                    var currentFldSet = fieldsets[i];
                    // pInputD1: data set for one fieldset
                    //
                    if (!pOptions.setupAll) {
                        // loop primarily through input data (not used fields are not reset)
                        Ext.each(pInputD1, function(pName) {
                            // 11.04.14 on; toto asi nefunguje dobre, protoze "name" je neinicializovana, ale zatim nevim, jak by to melo fungovat a ani se to nepouziva
                            // now find field by name in given fieldset (master or clone)
                            field = this.findField(currentFldSet, name);
                            // if found then setup data
                            if (!Ext.isEmpty(field)) {
                                values = pInputD1[pName];
                                this.setValues(field, values);
                            }
                        }, this);
                    } else {
                        // loop primarily through form fields data (means reset not mentioned fields)
                        // get all master fields under current fieldset
                        fields = this.findField(currentFldSet, '*');
                        // for all master fields in current fieldset
                        Ext.each(fields, function(pField) {
                            values = pInputD1[pField.name];
                            //         data to be set-up (may be null)
                            if (!values) { //                        fix for null
                                values = '';
                            }
                            //        setup values for any case (even if not present in input data)
                            this.setValues(pField, values);
                            // 29.02.12 on; musi mazat obsah pomocneho objektu
                            // 30.01.12 on; smaze obsah podpole v pInputD1, abych vedel, ze bylo uz vlozeno do formulare
                            oInput1[pField.name] = '';
                        }, this);
                        // 29.02.12 on; projde pomocny objekt
                        // 30.01.12 on; ted jeste projde pres vsechny pole v zaznamu a pokud nektere jeste nebylo do fieldsetu vlozeno,
                        //              ulozi si ho
                        // Go through all the properties of the passed-in object
                        currentFldSet.csNotPresentedFields = {};
                        // 23.05.12 on; presunuto pred cyklus, protoze si mazal vice vyskytu pole
                        for (prop in oInput1) {
                            if (oInput1[prop] !== '') {
                                // policka, ktera nejsou na formualari
                                //currentFldSet.csNotPresentedFields = {}; // 23.05.12 on; presunuto pred cyklus, protoze si mazal vice vyskytu pole
                                currentFldSet.csNotPresentedFields[prop] = oInput1[prop];
                            }
                        }
                    }
                }, this);
            }
        } else if (pXtype === 'field') {
            if (!pInputData) { // 12.05.09 rs; added default
                pInputData = {};
            }
            if (Ext.isArray(pInputData)) {
                // this alert may be commented out, if it gets in the way
                if (pOptions.warnings) {
                    window.alert('Ext.form.FormPanel.populate: input should be object!');
                }
                return;
                // input should be a object
            }
            // find all master components of given xtype (here 'field') in given namespace
            fields = this.findFormComponents(pNamespace, pXtype, 'master');
            // 08.12.21 on; nacte i treepanely
            var fieldsTree = this.findFormComponents(pNamespace, 'treepanel', 'master');
            if (fieldsTree.length > 0 ) {
              fields = fields.concat(fieldsTree);
            }
            if (fields.length === 0) {
                // 30.07.13 on; zakomentovane - hlaska se zobrazuje, kdyz vytvorim novy zaznam pres popup formular,
                //              muselo by se osetrit, aby v tomto pripade se nezobrazovala
                // this alert may be commented out, if it gets in the way
                /*if (pOptions.warnings) {
                 window.alert('Ext.form.FormPanel.populate: no fields found?!');
                 }*/
                return;
                // no fields found (nothing to do anyway)
            }
            // populate fields
            if (!pOptions.setupAll) {
                // loop primarily through input data
                var pName;
                // fix 20.05.09 rs
                for (pName in pInputData) {
                    if (pInputData.hasOwnProperty(pName)) { //        hasOwnProperty is for jslint
                        field = this.findField(fields, pName);
                        if (!Ext.isEmpty(field)) {
                            values = pInputData[pName];
                            this.setValues(field, values);
                        }
                    }
                }
            } else {
                // loop primarily through form fields data
                for (i in fields) {
                    if (fields.hasOwnProperty(i)) { //        hasOwnProperty is for jslint
                        field = fields[i];
                        //                   one of the found fields
                        values = pInputData[field.name];
                        //     data to be set-up (may be null)
                        if (!values) { //                       fix for null
                            // dyntriger and it's descendants take a object other need string
                            if (field.isXType('dyntrigger')) {
                                values = {};
                            } else {
                                values = '';
                            }
                        } else
                            // 30.08.16 on; osetreni zapisu prazdneho pole [] do dyntriggeru
                            if (Ext.isArray(values) && Ext.isEmpty(values) && field.isXType('dyntrigger')) {
                                values = [{}];
                            }
                        //       setup values for any case (even if not present in input data)
                        this.setValues(field, values);
                    }
                }
            }
        } else {
            // this alert may be commented out, if it gets in the way
            if (pOptions.warnings) {
                window.alert('Ext.form.FormPanel.populate: invalid value for pXtype=' + pXtype);
            }
        }
    }
});
