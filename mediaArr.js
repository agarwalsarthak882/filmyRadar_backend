const media = require("./media");

async function mediaArray(medArr,type) {
    let data=await Promise.all((medArr.results).map(async(item)=>{
        return (await media(item,type));
    }))    
return(data);

}
module.exports = mediaArray;