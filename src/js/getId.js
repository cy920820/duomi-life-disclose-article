function getId(itemLength){
    var itemLength = $(".itemv2").length;
    var itemIdArr = [];
    for(var i = 0; i < itemLength ; i++){
        var itemI = $(".itemv2")[i];
        var itemIIndex = itemI.getElementsByClassName("item-info")[0].getElementsByTagName("a")[0].getAttribute("href").indexOf("id=");
        var itemIId = itemI.getElementsByClassName("item-info")[0].getElementsByTagName("a")[0].getAttribute("href").substr(itemIIndex + 3);
        itemIdArr.push(itemIId);
    }
    var itemIdArrStr = '[' + itemIdArr.join() + ']';
    return itemIdArrStr;
}
console.log(getId());
