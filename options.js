function addItemRow( label="", link="", icon="" ) {
    let container = document.querySelector( ".item-list-container" );
    let itemCount = document.querySelectorAll( ".item-list-container .item-row" ).length;
    let innerHTML = `
                        <div class="item-row" id="item-${ itemCount }">
                            <div class="item-input">
                                <p>Label</p>
                                <input class="item-control-label" type="text" placeholder="Dashboard" value="${ label }">
                            </div>
                    
                            <div class="item-input">
                                <p>Link</p>
                                <input class="item-control-link" type="text" placeholder="https://moodle.rose-hulman.edu/my/" value="${ link }">
                            </div>
                    
                            <div class="item-input">
                                <p>Icon</p>
                                <input class="item-control-icon" type="text" placeholder="fa-laptop" value="${ icon }">
                            </div>
                    
                            <div class="item-contol">
                                <button class="item-control-remove" onclick="removeItemRow( ${ itemCount } )">Remove</button>
                            </div>
                        </div>
                    `;
    let dom = new DOMParser().parseFromString( innerHTML, "text/html" );
    console.log( dom.childNodes[ 0 ] )
    container.appendChild( dom.childNodes[ 0 ] );
}


function removeItemRow( index ) {
    document.querySelector( ".item-list-container" ).removeChild( document.querySelector( `#item-${ index }` ) );
}

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
        console.log('Value is set to ' + value);
    });
}


function init() {
    if ( document.querySelectorAll( ".item-list-container .item-row" ).length == 0 ) {
        addItemRow();
    }
}

init();