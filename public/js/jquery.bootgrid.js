/*!
 * jQuery Bootgrid v1.3.1 - 09/11/2015
 * Copyright (c) 2014-2015 Rafael Staib (http://www.jquery-bootgrid.com)
 * Licensed under MIT http://www.opensource.org/licenses/MIT
 */
! function(a, b, c) {
    "use strict";

    function d(a) {
        function b(b) {
            return c.identifier && b[c.identifier] === a[c.identifier]
        }
        var c = this;
        return this.rows.contains(b) ? !1 : (this.rows.push(a), !0)
    }

    function e(b) {
        var c = this.footer ? this.footer.find(b) : a(),
            d = this.header ? this.header.find(b) : a();
        return a.merge(c, d)
    }

    function f(b) {
        return b ? a.extend({}, this.cachedParams, {
            ctx: b
        }) : this.cachedParams
    }

    function g() {
        var b = {
                current: this.current,
                rowCount: this.rowCount,
                sort: this.sortDictionary,
                searchPhrase: this.searchPhrase
            },
            c = this.options.post;
        return c = a.isFunction(c) ? c() : c, this.options.requestHandler(a.extend(!0, b, c))
    }

    function h(b) {
        return "." + a.trim(b).replace(/\s+/gm, ".")
    }

    function i() {
        var b = this.options.url;
        return a.isFunction(b) ? b() : b
    }

    function j() {
        this.element.trigger("initialize" + H), m.call(this), this.selection = this.options.selection && null != this.identifier, o.call(this), q.call(this), C.call(this), A.call(this), r.call(this), n.call(this), this.element.trigger("initialized" + H)
    }

    function k(a) {
        this.options.highlightRows
    }

    function l(a) {
        return a.visible
    }

    function m() {
        var b = this,
            c = this.element.find("thead > tr").first(),
            d = !1;
        c.children().each(function() {
            var c = a(this),
                e = c.data(),
                f = {
                    id: e.columnId,
                    identifier: null == b.identifier && e.identifier || !1,
                    converter: b.options.converters[e.converter || e.type] || b.options.converters.string,
                    text: c.text(),
                    align: e.align || "left",
                    headerAlign: e.headerAlign || "left",
                    cssClass: e.cssClass || "",
                    headerCssClass: e.headerCssClass || "",
                    formatter: b.options.formatters[e.formatter] || null,
                    order: d || "asc" !== e.order && "desc" !== e.order ? null : e.order,
                    searchable: !(e.searchable === !1),
                    sortable: !(e.sortable === !1),
                    visible: !(e.visible === !1),
                    visibleInSelection: !(e.visibleInSelection === !1),
                    width: a.isNumeric(e.width) ? e.width + "px" : "string" == typeof e.width ? e.width : null
                };
            b.columns.push(f), null != f.order && (b.sortDictionary[f.id] = f.order), f.identifier && (b.identifier = f.id, b.converter = f.converter), b.options.multiSort || null === f.order || (d = !0)
        })
    }

    function n() {
        function c(a) {
            for (var b, c = new RegExp(e.searchPhrase, e.options.caseSensitive ? "g" : "gi"), d = 0; d < e.columns.length; d++)
                if (b = e.columns[d], b.searchable && b.visible && b.converter.to(a[b.id]).search(c) > -1) return !0;
            return !1
        }

        function d(a, b) {
            e.currentRows = a, p.call(e, b), e.options.keepSelection || (e.selectedRows = []), y.call(e, a), t.call(e), v.call(e), e.element._bgBusyAria(!1).trigger("loaded" + H)
        }
        var e = this;
        if (this.element._bgBusyAria(!0).trigger("load" + H), F.call(this), this.options.ajax) {
            var f = g.call(this),
                h = i.call(this);
            if (null == h || "string" != typeof h || 0 === h.length) throw new Error("Url setting must be a none empty string or a function that returns one.");
            this.xqr && this.xqr.abort();
            var j = {
                url: h,
                data: f,
                success: function(b) {
                    e.xqr = null, "string" == typeof b && (b = a.parseJSON(b)), b = e.options.responseHandler(b), e.current = b.current, d(b.rows, b.total)
                },
                error: function(a, b, c) {
                    e.xqr = null, "abort" !== b && (u.call(e), e.element._bgBusyAria(!1).trigger("loaded" + H))
                }
            };
            j = a.extend(this.options.ajaxSettings, j), this.xqr = a.ajax(j)
        } else {
            var k = this.searchPhrase.length > 0 ? this.rows.where(c) : this.rows,
                l = k.length; - 1 !== this.rowCount && (k = k.page(this.current, this.rowCount)), b.setTimeout(function() {
                d(k, l)
            }, 10)
        }
    }

    function o() {
        if (!this.options.ajax) {
            var b = this,
                c = this.element.find("tbody > tr");
            c.each(function() {
                var c = a(this),
                    e = c.children("td"),
                    f = {};
                a.each(b.columns, function(a, b) {
                    f[b.id] = b.converter.from(e.eq(a).text())
                }), d.call(b, f)
            }), p.call(this, this.rows.length), G.call(this)
        }
    }

    function p(a) {
        this.total = a, this.totalPages = -1 === this.rowCount ? 1 : Math.ceil(this.total / this.rowCount)
    }

    function q() {
        var b = this.options.templates,
            c = this.element.parent().hasClass(this.options.css.responsiveTable) ? this.element.parent() : this.element;
        this.element.addClass(this.options.css.table), 0 === this.element.children("tbody").length && this.element.append(b.body), 1 & this.options.navigation && (this.header = a(b.header.resolve(f.call(this, {
            id: this.element._bgId() + "-header"
        }))), c.before(this.header)), 2 & this.options.navigation && (this.footer = a(b.footer.resolve(f.call(this, {
            id: this.element._bgId() + "-footer"
        }))), c.after(this.footer))
    }

    function r() {
        if (0 !== this.options.navigation) {
            var b = this.options.css,
                c = h(b.actions),
                d = e.call(this, c);
            if (d.length > 0) {
                var g = this,
                    i = this.options.templates,
                    j = a(i.actions.resolve(f.call(this)));
                if (this.options.ajax) {
                    var k = i.icon.resolve(f.call(this, {
                            iconCss: b.iconRefresh
                        })),
                        l = a(i.actionButton.resolve(f.call(this, {
                            content: k,
                            text: this.options.labels.refresh
                        }))).on("click" + H, function(a) {
                            a.stopPropagation(), g.current = 1, n.call(g)
                        });
                    j.append(l)
                }
                x.call(this, j), s.call(this, j), E.call(this, d, j)
            }
        }
    }

    function s(b) {
        if (this.options.columnSelection && this.columns.length > 1) {
            var c = this,
                d = this.options.css,
                e = this.options.templates,
                g = e.icon.resolve(f.call(this, {
                    iconCss: d.iconColumns
                })),
                i = a(e.actionDropDown.resolve(f.call(this, {
                    content: g
                }))),
                j = h(d.dropDownItem),
                k = h(d.dropDownItemCheckbox),
                m = h(d.dropDownMenuItems);
            a.each(this.columns, function(b, g) {
                if (g.visibleInSelection) {
                    var o = a(e.actionDropDownCheckboxItem.resolve(f.call(c, {
                        name: g.id,
                        label: g.text,
                        checked: g.visible
                    }))).on("click" + H, j, function(b) {
                        b.stopPropagation();
                        var d = a(this),
                            e = d.find(k);
                        if (!e.prop("disabled")) {
                            g.visible = e.prop("checked");
                            var f = c.columns.where(l).length > 1;
                            d.parents(m).find(j + ":has(" + k + ":checked)")._bgEnableAria(f).find(k)._bgEnableField(f), c.element.find("tbody").empty(), C.call(c), n.call(c)
                        }
                    });
                    i.find(h(d.dropDownMenuItems)).append(o)
                }
            }), b.append(i)
        }
    }

    function t() {
        if (0 !== this.options.navigation) {
            var b = h(this.options.css.infos),
                c = e.call(this, b);
            if (c.length > 0) {
                var d = this.current * this.rowCount,
                    g = a(this.options.templates.infos.resolve(f.call(this, {
                        end: 0 === this.total || -1 === d || d > this.total ? this.total : d,
                        start: 0 === this.total ? 0 : d - this.rowCount + 1,
                        total: this.total
                    })));
                E.call(this, c, g)
            }
        }
    }

    function u() {
        var a = this.element.children("tbody").first(),
            b = this.options.templates,
            c = this.columns.where(l).length;
        this.selection && (c += 1), a.html(b.noResults.resolve(f.call(this, {
            columns: c
        })))
    }

    function v() {
        if (0 !== this.options.navigation) {
            var b = h(this.options.css.pagination),
                c = e.call(this, b)._bgShowAria(-1 !== this.rowCount);
            if (-1 !== this.rowCount && c.length > 0) {
                var d = this.options.templates,
                    g = this.current,
                    i = this.totalPages,
                    j = a(d.pagination.resolve(f.call(this))),
                    k = i - g,
                    l = -1 * (this.options.padding - g),
                    m = k >= this.options.padding ? Math.max(l, 1) : Math.max(l - this.options.padding + k, 1),
                    n = 2 * this.options.padding + 1,
                    o = i >= n ? n : i;
                w.call(this, j, "first", "&laquo;", "first")._bgEnableAria(g > 1), w.call(this, j, "prev", "&lt;", "prev")._bgEnableAria(g > 1);
                for (var p = 0; o > p; p++) {
                    var q = p + m;
                    w.call(this, j, q, q, "page-" + q)._bgEnableAria()._bgSelectAria(q === g)
                }
                0 === o && w.call(this, j, 1, 1, "page-1")._bgEnableAria(!1)._bgSelectAria(), w.call(this, j, "next", "&gt;", "next")._bgEnableAria(i > g), w.call(this, j, "last", "&raquo;", "last")._bgEnableAria(i > g), E.call(this, c, j)
            }
        }
    }

    function w(b, c, d, e) {
        var g = this,
            i = this.options.templates,
            j = this.options.css,
            k = f.call(this, {
                css: e,
                text: d,
                page: c
            }),
            l = a(i.paginationItem.resolve(k)).on("click" + H, h(j.paginationButton), function(b) {
                b.stopPropagation(), b.preventDefault();
                var c = a(this),
                    d = c.parent();
                if (!d.hasClass("active") && !d.hasClass("disabled")) {
                    var e = {
                            first: 1,
                            prev: g.current - 1,
                            next: g.current + 1,
                            last: g.totalPages
                        },
                        f = c.data("page");
                    g.current = e[f] || f, n.call(g)
                }
                c.trigger("blur")
            });
        return b.append(l), l
    }

    function x(b) {
        function c(a) {
            return -1 === a ? d.options.labels.all : a
        }
        var d = this,
            e = this.options.rowCount;
        if (a.isArray(e)) {
            var g = this.options.css,
                i = this.options.templates,
                j = a(i.actionDropDown.resolve(f.call(this, {
                    content: c(this.rowCount)
                }))),
                k = h(g.dropDownMenu),
                l = h(g.dropDownMenuText),
                m = h(g.dropDownMenuItems),
                o = h(g.dropDownItemButton);
            a.each(e, function(b, e) {
                var g = a(i.actionDropDownItem.resolve(f.call(d, {
                    text: c(e),
                    action: e
                })))._bgSelectAria(e === d.rowCount).on("click" + H, o, function(b) {
                    b.preventDefault();
                    var e = a(this),
                        f = e.data("action");
                    f !== d.rowCount && (d.current = 1, d.rowCount = f, e.parents(m).children().each(function() {
                        var b = a(this),
                            c = b.find(o).data("action");
                        b._bgSelectAria(c === f)
                    }), e.parents(k).find(l).text(c(f)), n.call(d))
                });
                j.find(m).append(g)
            }), b.append(j)
        }
    }

    function y(b) {
        if (b.length > 0) {
            var c = this,
                d = this.options.css,
                e = this.options.templates,
                g = this.element.children("tbody").first(),
                i = !0,
                j = "";
            a.each(b, function(b, g) {
                var h = "",
                    k = ' data-row-id="' + (null == c.identifier ? b : g[c.identifier]) + '"',
                    l = "";
                if (c.selection) {
                    var m = -1 !== a.inArray(g[c.identifier], c.selectedRows),
                        n = e.select.resolve(f.call(c, {
                            type: "checkbox",
                            value: g[c.identifier],
                            checked: m
                        }));
                    h += e.cell.resolve(f.call(c, {
                        content: n,
                        css: d.selectCell
                    })), i = i && m, m && (l += d.selected, k += ' aria-selected="true"')
                }
                var o = null != g.status && c.options.statusMapping[g.status];
                o && (l += o), a.each(c.columns, function(b, i) {
                    if (i.visible) {
                        var j = a.isFunction(i.formatter) ? i.formatter.call(c, i, g) : i.converter.to(g[i.id]),
                            k = i.cssClass.length > 0 ? " " + i.cssClass : "";
                        h += e.cell.resolve(f.call(c, {
                            content: null == j || "" === j ? "&nbsp;" : j,
                            css: ("right" === i.align ? d.right : "center" === i.align ? d.center : d.left) + k,
                            style: null == i.width ? "" : "width:" + i.width + ";"
                        }))
                    }
                }), l.length > 0 && (k += ' class="' + l + '"'), j += e.row.resolve(f.call(c, {
                    attr: k,
                    cells: h
                }))
            }), c.element.find("thead " + h(c.options.css.selectBox)).prop("checked", i), g.html(j), z.call(this, g)
        } else u.call(this)
    }

    function z(b) {
        var c = this,
            d = h(this.options.css.selectBox);
        this.selection && b.off("click" + H, d).on("click" + H, d, function(b) {
            b.stopPropagation();
            var d = a(this),
                e = c.converter.from(d.val());
            d.prop("checked") ? c.select([e]) : c.deselect([e])
        }), b.off("click" + H, "> tr").on("click" + H, "> tr", function(b) {
            b.stopPropagation();
            var d = a(this),
                e = null == c.identifier ? d.data("row-id") : c.converter.from(d.data("row-id") + ""),
                f = null == c.identifier ? c.currentRows[e] : c.currentRows.first(function(a) {
                    return a[c.identifier] === e
                });
            c.selection && c.options.rowSelect && (d.hasClass(c.options.css.selected) ? c.deselect([e]) : c.select([e])), c.element.trigger("click" + H, [c.columns, f])
        })
    }

    function A() {
        if (0 !== this.options.navigation) {
            var c = this.options.css,
                d = h(c.search),
                g = e.call(this, d);
            if (g.length > 0) {
                var i = this,
                    j = this.options.templates,
                    k = null,
                    l = "",
                    m = h(c.searchField),
                    n = a(j.search.resolve(f.call(this))),
                    o = n.is(m) ? n : n.find(m);
                o.on("keyup" + H, function(c) {
                    c.stopPropagation();
                    var d = a(this).val();
                    (l !== d || 13 === c.which && "" !== d) && (l = d, (13 === c.which || 0 === d.length || d.length >= i.options.searchSettings.characters) && (b.clearTimeout(k), k = b.setTimeout(function() {
                        B.call(i, d)
                    }, i.options.searchSettings.delay)))
                }), E.call(this, g, n)
            }
        }
    }

    function B(a) {
        this.searchPhrase !== a && (this.current = 1, this.searchPhrase = a, n.call(this))
    }

    function C() {
        var b = this,
            c = this.element.find("thead > tr"),
            d = this.options.css,
            e = this.options.templates,
            g = "",
            i = this.options.sorting;
        if (this.selection) {
            var j = this.options.multiSelect ? e.select.resolve(f.call(b, {
                type: "checkbox",
                value: "all"
            })) : "";
            g += e.rawHeaderCell.resolve(f.call(b, {
                content: j,
                css: d.selectCell
            }))
        }
        if (a.each(this.columns, function(a, c) {
                if (c.visible) {
                    var h = b.sortDictionary[c.id],
                        j = i && h && "asc" === h ? d.iconUp : i && h && "desc" === h ? d.iconDown : "",
                        k = e.icon.resolve(f.call(b, {
                            iconCss: j
                        })),
                        l = c.headerAlign,
                        m = c.headerCssClass.length > 0 ? " " + c.headerCssClass : "";
                    g += e.headerCell.resolve(f.call(b, {
                        column: c,
                        icon: k,
                        sortable: i && c.sortable && d.sortable || "",
                        css: ("right" === l ? d.right : "center" === l ? d.center : d.left) + m,
                        style: null == c.width ? "" : "width:" + c.width + ";"
                    }))
                }
            }), c.html(g), i) {
            var k = h(d.sortable);
            c.off("click" + H, k).on("click" + H, k, function(c) {
                c.preventDefault(), D.call(b, a(this)), G.call(b), n.call(b)
            })
        }
        if (this.selection && this.options.multiSelect) {
            var l = h(d.selectBox);
            c.off("click" + H, l).on("click" + H, l, function(c) {
                c.stopPropagation(), a(this).prop("checked") ? b.select() : b.deselect()
            })
        }
    }

    function D(a) {
        var b = this.options.css,
            c = h(b.icon),
            d = a.data("column-id") || a.parents("th").first().data("column-id"),
            e = this.sortDictionary[d],
            f = a.find(c);
        if (this.options.multiSort || (a.parents("tr").first().find(c).removeClass(b.iconDown + " " + b.iconUp), this.sortDictionary = {}), e && "asc" === e) this.sortDictionary[d] = "desc", f.removeClass(b.iconUp).addClass(b.iconDown);
        else if (e && "desc" === e)
            if (this.options.multiSort) {
                var g = {};
                for (var i in this.sortDictionary) i !== d && (g[i] = this.sortDictionary[i]);
                this.sortDictionary = g, f.removeClass(b.iconDown)
            } else this.sortDictionary[d] = "asc", f.removeClass(b.iconDown).addClass(b.iconUp);
        else this.sortDictionary[d] = "asc", f.addClass(b.iconUp)
    }

    function E(b, c) {
        b.each(function(b, d) {
            a(d).before(c.clone(!0)).remove()
        })
    }

    function F() {
        var a = this;
        b.setTimeout(function() {
            if ("true" === a.element._bgAria("busy")) {
                var b = a.options.templates,
                    c = a.element.children("thead").first(),
                    d = a.element.children("tbody").first(),
                    e = d.find("tr > td").first(),
                    g = a.element.height() - c.height() - (e.height() + 20),
                    h = a.columns.where(l).length;
                a.selection && (h += 1), d.html(b.loading.resolve(f.call(a, {
                    columns: h
                }))), -1 !== a.rowCount && g > 0 && d.find("tr > td").css("padding", "20px 0 " + g + "px")
            }
        }, 250)
    }

    function G() {
        function a(c, d, e) {
            function f(a) {
                return "asc" === h.order ? a : -1 * a
            }
            e = e || 0;
            var g = e + 1,
                h = b[e];
            return c[h.id] > d[h.id] ? f(1) : c[h.id] < d[h.id] ? f(-1) : b.length > g ? a(c, d, g) : 0
        }
        var b = [];
        if (!this.options.ajax) {
            for (var c in this.sortDictionary)(this.options.multiSort || 0 === b.length) && b.push({
                id: c,
                order: this.sortDictionary[c]
            });
            b.length > 0 && this.rows.sort(a)
        }
    }
    var H = ".rs.jquery.bootgrid",
        I = function(b, c) {
            this.element = a(b), this.origin = this.element.clone(), this.options = a.extend(!0, {}, I.defaults, this.element.data(), c);
            var d = this.options.rowCount = this.element.data().rowCount || c.rowCount || this.options.rowCount;
            this.columns = [], this.current = 1, this.currentRows = [], this.identifier = null, this.selection = !1, this.converter = null, this.rowCount = a.isArray(d) ? d[0] : d, this.rows = [], this.searchPhrase = "", this.selectedRows = [], this.sortDictionary = {}, this.total = 0, this.totalPages = 0, this.cachedParams = {
                lbl: this.options.labels,
                css: this.options.css,
                ctx: {}
            }, this.header = null, this.footer = null, this.xqr = null
        };
    if (I.defaults = {
            navigation: 3,
            padding: 2,
            columnSelection: !0,
            rowCount: [10, 25, 50, -1],
            selection: !1,
            multiSelect: !1,
            rowSelect: !1,
            keepSelection: !1,
            highlightRows: !1,
            sorting: !0,
            multiSort: !1,
            searchSettings: {
                delay: 250,
                characters: 1
            },
            ajax: !1,
            ajaxSettings: {
                method: "POST"
            },
            post: {},
            url: "",
            caseSensitive: !0,
            requestHandler: function(a) {
                return a
            },
            responseHandler: function(a) {
                return a
            },
            converters: {
                numeric: {
                    from: function(a) {
                        return +a
                    },
                    to: function(a) {
                        return a + ""
                    }
                },
                string: {
                    from: function(a) {
                        return a
                    },
                    to: function(a) {
                        return a
                    }
                }
            },
            css: {
                actions: "actions btn-group",
                center: "text-center",
                columnHeaderAnchor: "column-header-anchor",
                columnHeaderText: "text",
                dropDownItem: "dropdown-item",
                dropDownItemButton: "dropdown-item-button",
                dropDownItemCheckbox: "dropdown-item-checkbox",
                dropDownMenu: "dropdown btn-group",
                dropDownMenuItems: "dropdown-menu pull-right",
                dropDownMenuText: "dropdown-text",
                footer: "bootgrid-footer container-fluid",
                header: "bootgrid-header container-fluid",
                icon: "icon glyphicon",
                iconColumns: "glyphicon-th-list",
                iconDown: "glyphicon-chevron-down",
                iconRefresh: "glyphicon-refresh",
                iconSearch: "glyphicon-search",
                iconUp: "glyphicon-chevron-up",
                infos: "infos",
                left: "text-left",
                pagination: "pagination",
                paginationButton: "button",
                responsiveTable: "table-responsive",
                right: "text-right",
                search: "search form-group",
                searchField: "search-field form-control",
                selectBox: "select-box",
                selectCell: "select-cell",
                selected: "active",
                sortable: "sortable",
                table: "bootgrid-table table"
            },
            formatters: {},
            labels: {
                all: "All",
                infos: "Showing {{ctx.start}} to {{ctx.end}} of {{ctx.total}} entries",
                loading: "Loading...",
                noResults: "No results found!",
                refresh: "Refresh",
                search: "Search"
            },
            statusMapping: {
                0: "success",
                1: "info",
                2: "warning",
                3: "danger"
            },
            templates: {
                actionButton: '<button class="btn btn-default bffbh" type="button" title="{{ctx.text}}">{{ctx.content}}&nbsp;</button>',
                actionDropDown: '<div class="{{css.dropDownMenu}}"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><span class="{{css.dropDownMenuText}}">{{ctx.content}}</span> <span class="caret"></span></button><ul class="{{css.dropDownMenuItems}}" role="menu"></ul></div>',
                actionDropDownItem: '<li><a data-action="{{ctx.action}}" class="{{css.dropDownItem}} {{css.dropDownItemButton}}">{{ctx.text}}</a></li>',
                actionDropDownCheckboxItem: '<li><label class="{{css.dropDownItem}}"><input name="{{ctx.name}}" type="checkbox" value="1" class="{{css.dropDownItemCheckbox}}" {{ctx.checked}} /> {{ctx.label}}</label></li>',
                actions: '<div class="{{css.actions}}"></div>',
                body: "<tbody></tbody>",
                cell: '<td class="{{ctx.css}}" style="{{ctx.style}}">{{ctx.content}}</td>',
                footer: '<div id="{{ctx.id}}" class="{{css.footer}}"><div class="row"><div class="col-sm-6"><p class="{{css.pagination}}"></p></div><div class="col-sm-6 infoBar"><p class="{{css.infos}}"></p></div></div></div>',
                header: '<div id="{{ctx.id}}" class="{{css.header}}"><div class="row"><div class="col-sm-12 actionBar no-padding"><p class="{{css.search}}"></p><p class="{{css.actions}}"></p></div></div></div>',
                headerCell: '<th data-column-id="{{ctx.column.id}}" class="{{ctx.css}}" style="{{ctx.style}}"><a href="javascript:void(0);" class="{{css.columnHeaderAnchor}} {{ctx.sortable}}"><span class="{{css.columnHeaderText}}">{{ctx.column.text}}</span>{{ctx.icon}}</a></th>',
                icon: '<span class="{{css.icon}} {{ctx.iconCss}}"></span>',
                infos: '<div class="{{css.infos}}">{{lbl.infos}}</div>',
                loading: '<tr><td colspan="{{ctx.columns}}" class="loading">{{lbl.loading}}</td></tr>',
                noResults: '<tr><td colspan="{{ctx.columns}}" class="no-results">{{lbl.noResults}}</td></tr>',
                pagination: '<ul class="{{css.pagination}}"></ul>',
                paginationItem: '<li class="{{ctx.css}}"><a data-page="{{ctx.page}}" class="{{css.paginationButton}}">{{ctx.text}}</a></li>',
                rawHeaderCell: '<th class="{{ctx.css}}">{{ctx.content}}</th>',
                row: "<tr{{ctx.attr}}>{{ctx.cells}}</tr>",
                search: '<div class="{{css.search}}"><div class="input-group"><span class="{{css.icon}} input-group-addon {{css.iconSearch}}"></span> <input type="text" class="{{css.searchField}}" placeholder="{{lbl.search}}" /></div></div>',
                select: '<input name="select" type="{{ctx.type}}" class="{{css.selectBox}}" value="{{ctx.value}}" {{ctx.checked}} />'
            }
        }, I.prototype.append = function(a) {
            if (this.options.ajax);
            else {
                for (var b = [], c = 0; c < a.length; c++) d.call(this, a[c]) && b.push(a[c]);
                G.call(this), k.call(this, b), n.call(this), this.element.trigger("appended" + H, [b])
            }
            return this
        }, I.prototype.clear = function() {
            if (this.options.ajax);
            else {
                var b = a.extend([], this.rows);
                this.rows = [], this.current = 1, this.total = 0, n.call(this), this.element.trigger("cleared" + H, [b])
            }
            return this
        }, I.prototype.destroy = function() {
            return a(b).off(H), 1 & this.options.navigation && this.header.remove(), 2 & this.options.navigation && this.footer.remove(), this.element.before(this.origin).remove(), this
        }, I.prototype.reload = function() {
            return this.current = 1, n.call(this), this
        }, I.prototype.remove = function(a) {
            if (null != this.identifier) {
                if (this.options.ajax);
                else {
                    a = a || this.selectedRows;
                    for (var b, c = [], d = 0; d < a.length; d++) {
                        b = a[d];
                        for (var e = 0; e < this.rows.length; e++)
                            if (this.rows[e][this.identifier] === b) {
                                c.push(this.rows[e]), this.rows.splice(e, 1);
                                break
                            }
                    }
                    this.current = 1, n.call(this), this.element.trigger("removed" + H, [c])
                }
            }
            return this
        }, I.prototype.search = function(a) {
            if (a = a || "", this.searchPhrase !== a) {
                var b = h(this.options.css.searchField),
                    c = e.call(this, b);
                c.val(a)
            }
            return B.call(this, a), this
        }, I.prototype.select = function(b) {
            if (this.selection) {
                b = b || this.currentRows.propValues(this.identifier);
                for (var c, d, e = []; b.length > 0 && (this.options.multiSelect || 1 !== e.length);)
                    if (c = b.pop(), -1 === a.inArray(c, this.selectedRows))
                        for (d = 0; d < this.currentRows.length; d++)
                            if (this.currentRows[d][this.identifier] === c) {
                                e.push(this.currentRows[d]), this.selectedRows.push(c);
                                break
                            }
                if (e.length > 0) {
                    var f = h(this.options.css.selectBox),
                        g = this.selectedRows.length >= this.currentRows.length;
                    for (d = 0; !this.options.keepSelection && g && d < this.currentRows.length;) g = -1 !== a.inArray(this.currentRows[d++][this.identifier], this.selectedRows);
                    for (this.element.find("thead " + f).prop("checked", g), this.options.multiSelect || this.element.find("tbody > tr " + f + ":checked").trigger("click" + H), d = 0; d < this.selectedRows.length; d++) this.element.find('tbody > tr[data-row-id="' + this.selectedRows[d] + '"]').addClass(this.options.css.selected)._bgAria("selected", "true").find(f).prop("checked", !0);
                    this.element.trigger("selected" + H, [e])
                }
            }
            return this
        }, I.prototype.deselect = function(b) {
            if (this.selection) {
                b = b || this.currentRows.propValues(this.identifier);
                for (var c, d, e, f = []; b.length > 0;)
                    if (c = b.pop(), e = a.inArray(c, this.selectedRows), -1 !== e)
                        for (d = 0; d < this.currentRows.length; d++)
                            if (this.currentRows[d][this.identifier] === c) {
                                f.push(this.currentRows[d]), this.selectedRows.splice(e, 1);
                                break
                            }
                if (f.length > 0) {
                    var g = h(this.options.css.selectBox);
                    for (this.element.find("thead " + g).prop("checked", !1), d = 0; d < f.length; d++) this.element.find('tbody > tr[data-row-id="' + f[d][this.identifier] + '"]').removeClass(this.options.css.selected)._bgAria("selected", "false").find(g).prop("checked", !1);
                    this.element.trigger("deselected" + H, [f])
                }
            }
            return this
        }, I.prototype.sort = function(b) {
            var c = b ? a.extend({}, b) : {};
            return c === this.sortDictionary ? this : (this.sortDictionary = c, C.call(this), G.call(this), n.call(this), this)
        }, I.prototype.getColumnSettings = function() {
            return a.merge([], this.columns)
        }, I.prototype.getCurrentPage = function() {
            return this.current
        }, I.prototype.getCurrentRows = function() {
            return a.merge([], this.currentRows)
        }, I.prototype.getRowCount = function() {
            return this.rowCount
        }, I.prototype.getSearchPhrase = function() {
            return this.searchPhrase
        }, I.prototype.getSelectedRows = function() {
            return a.merge([], this.selectedRows)
        }, I.prototype.getSortDictionary = function() {
            return a.extend({}, this.sortDictionary)
        }, I.prototype.getTotalPageCount = function() {
            return this.totalPages
        }, I.prototype.getTotalRowCount = function() {
            return this.total
        }, a.fn.extend({
            _bgAria: function(a, b) {
                return b ? this.attr("aria-" + a, b) : this.attr("aria-" + a)
            },
            _bgBusyAria: function(a) {
                return null == a || a ? this._bgAria("busy", "true") : this._bgAria("busy", "false")
            },
            _bgRemoveAria: function(a) {
                return this.removeAttr("aria-" + a)
            },
            _bgEnableAria: function(a) {
                return null == a || a ? this.removeClass("disabled")._bgAria("disabled", "false") : this.addClass("disabled")._bgAria("disabled", "true")
            },
            _bgEnableField: function(a) {
                return null == a || a ? this.removeAttr("disabled") : this.attr("disabled", "disable")
            },
            _bgShowAria: function(a) {
                return null == a || a ? this.show()._bgAria("hidden", "false") : this.hide()._bgAria("hidden", "true")
            },
            _bgSelectAria: function(a) {
                return null == a || a ? this.addClass("active")._bgAria("selected", "true") : this.removeClass("active")._bgAria("selected", "false")
            },
            _bgId: function(a) {
                return a ? this.attr("id", a) : this.attr("id")
            }
        }), !String.prototype.resolve) {
        var J = {
            checked: function(a) {
                return "boolean" == typeof a ? a ? 'checked="checked"' : "" : a
            }
        };
        String.prototype.resolve = function(b, c) {
            var d = this;
            return a.each(b, function(b, e) {
                if (null != e && "function" != typeof e)
                    if ("object" == typeof e) {
                        var f = c ? a.extend([], c) : [];
                        f.push(b), d = d.resolve(e, f) + ""
                    } else {
                        J && J[b] && "function" == typeof J[b] && (e = J[b](e)), b = c ? c.join(".") + "." + b : b;
                        var g = new RegExp("\\{\\{" + b + "\\}\\}", "gm");
                        d = d.replace(g, e.replace ? e.replace(/\$/gi, "&#36;") : e)
                    }
            }), d
        }
    }
    Array.prototype.first || (Array.prototype.first = function(a) {
        for (var b = 0; b < this.length; b++) {
            var c = this[b];
            if (a(c)) return c
        }
        return null
    }), Array.prototype.contains || (Array.prototype.contains = function(a) {
        for (var b = 0; b < this.length; b++) {
            var c = this[b];
            if (a(c)) return !0
        }
        return !1
    }), Array.prototype.page || (Array.prototype.page = function(a, b) {
        var c = (a - 1) * b,
            d = c + b;
        return this.length > c ? this.length > d ? this.slice(c, d) : this.slice(c) : []
    }), Array.prototype.where || (Array.prototype.where = function(a) {
        for (var b = [], c = 0; c < this.length; c++) {
            var d = this[c];
            a(d) && b.push(d)
        }
        return b
    }), Array.prototype.propValues || (Array.prototype.propValues = function(a) {
        for (var b = [], c = 0; c < this.length; c++) b.push(this[c][a]);
        return b
    });
    var K = a.fn.bootgrid;
    a.fn.bootgrid = function(b) {
        var c = Array.prototype.slice.call(arguments, 1),
            d = null,
            e = this.each(function(e) {
                var f = a(this),
                    g = f.data(H),
                    h = "object" == typeof b && b;
                if ((g || "destroy" !== b) && (g || (f.data(H, g = new I(this, h)), j.call(g)), "string" == typeof b))
                    if (0 === b.indexOf("get") && 0 === e) d = g[b].apply(g, c);
                    else if (0 !== b.indexOf("get")) return g[b].apply(g, c)
            });
        return "string" == typeof b && 0 === b.indexOf("get") ? d : e
    }, a.fn.bootgrid.Constructor = I, a.fn.bootgrid.noConflict = function() {
        return a.fn.bootgrid = K, this
    }, a('[data-toggle="bootgrid"]').bootgrid()
}(jQuery, window);