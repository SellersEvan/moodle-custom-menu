/*
 *   Copyright (C) 2021 Sellers Industry
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Wed Dec 01 2021
 *   file: options.js
 *   project: Moodle Custom Menu
 *   purpose: Option Menu
 *
 */


// Add Item rows
function addItemRow( meta={ "label": "", "link": "", "icon": "" } ) {
    let container = document.querySelector( ".item-list-container" );
    let itemCount = document.querySelectorAll( ".item-list-container .item-row" ).length;
    let innerHTML = `
                        <div class="item-row" id="item-${ itemCount }">
                            <div class="item-input">
                                <p>Label</p>
                                <input class="item-control-label" type="text" placeholder="Dashboard" value="${ meta.label }">
                            </div>
                    
                            <div class="item-input">
                                <p>Link</p>
                                <input class="item-control-link" type="text" placeholder="https://moodle.rose-hulman.edu/my/" value="${ meta.link }">
                            </div>
                    
                            <div class="item-input">
                                <p>Icon</p>
                                <input class="item-control-icon" type="text" placeholder="fa-laptop" value="${ meta.icon }">
                            </div>
                    
                            <div class="item-contol">
                                <button class="item-control-remove">Remove</button>
                            </div>
                        </div>
                    `;
    let dom = new DOMParser().parseFromString( innerHTML, "text/html" );
    dom.querySelector( ".item-control-remove" ).addEventListener( "click", () => {
        removeItemRow( 0 );
    });
    container.appendChild( dom.querySelector( ".item-row" ) );
}


// Remove Items
function removeItemRow( index ) {
    document.querySelector( ".item-list-container" ).removeChild( document.querySelector( `#item-${ index }` ) );
}


// Save Items
function saveItems() {
    let items = [];
    document.querySelectorAll( ".item-list-container .item-row" ).forEach( elm => {
        let _label = elm.querySelector( ".item-control-label" ).value;
        let _link  = elm.querySelector( ".item-control-link" ).value;
        let _icon  = elm.querySelector( ".item-control-icon" ).value;

        if ( _label != "" && _link != "" )
            items.push( {
                    "label": _label,
                    "link": _link,
                    "icon": _icon,
                });
    });
    chrome.storage.sync.set( { "items": items }, () => {
        alert( "Updated the sidebar settings for moodle. You can now reload your moodle site." );
        window.location.reload();
    });
}


// Init
function init() {
    let container = document.querySelectorAll( ".item-list-container .item-row" );
    let addBtn    = document.querySelector( "#action-btn-add-item" );
    let saveBtn   = document.querySelector( "#action-btn-save-items" );
    addBtn.addEventListener( "click", () => { addItemRow(); });
    saveBtn.addEventListener( "click", () => { saveItems(); });
    chrome.storage.sync.get( [ "items" ] , function( result ) {
        result[ "items" ].forEach( ( item ) => { addItemRow( item ); } );
        if ( container.length == 0 ) addItemRow();
    });
}

init();