/*
 *   Copyright (C) 2021 Sellers Industry
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Tue Nov 30 2021
 *   file: content.js
 *   project: Moodle Custom Menu
 *   purpose: Edits HTML on page
 *
 */



let dummyFill = "<div style='text-align:center; padding-top: 4rem; padding-bottom: 4rem;'><b>Custom Moodle Menu</b><br>Designed by <a href='https://sellersew.com' target='blank'>Sellers Industry</a><br><br>Add menu items through the extension options page.<br><a href='/my'>My Dashboard</a></div>"

function buildHtmlDom( items ) {
    let html = "<ul>";
    items.forEach( ( item ) => {
        html += `<li>
                    <a class="list-group-item list-group-item-action" href="${ item[ "link" ] }" >
                        <div class="ml-0">
                            <div class="media">
                                <span class="media-left"><i class="icon fa ${ item[ "icon" ] || "fa-tachometer" } fa-fw" aria-hidden="true"></i></span>
                                <span class="media-body ">${ item[ "label" ] }</span>
                            </div>
                        </div>
                    </a>
                </li>`;
    });
    return html + "</ul>";
}


function inject( htmlDom ) {
    let menu = document.querySelectorAll( "#nav-drawer .list-group" );
    menu     = menu[ menu.length - 1 ];
    console.log( menu )
    menu.innerHTML = htmlDom;
}

// inject( buildHtmlDom( [ { "label": "Dashboard", "link": "https://moodle.rose-hulman.edu/my/", "icon": "fa-laptop" } ] ) );
inject( dummyFill );