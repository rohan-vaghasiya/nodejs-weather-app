const request=require('request')

const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicm9oYW40NDY1IiwiYSI6ImNrczBjbHh2ODExZmgycW85bmRzZXJyNmgifQ.ywU3yGRHHhgqflN4Eiidsw&limit=1'

    request({url,json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect with server!!!',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location, Try another location',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longtitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode