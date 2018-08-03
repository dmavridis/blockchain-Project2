// Add data to levelDB with value
function addDataToLevelDB(block) {
    let i = 0;
    db.createReadStream().on('data', function(data) {
          i++;
        }).on('error', function(err) {
            return console.log('Unable to read data stream!', err)
        }).on('close', function() {
          if (i == 0){
            console.log("Blockchain created")
            console.log("Genesis Block Added")
            addLevelDBData(0, block);
          }
          else{
            if (block.height > 0){
              console.log('Block #' + i);
              block.height = i;
              addLevelDBData(i, block);
            }
            else{
              // Don't add genesis block again
              console.log("Blockchain already exists")
            }
          }
        })
    }

    // Get data from levelDB with key
function getLevelDBData(key){
    db.get(key, function(err, value) {
      if (err) return console.log('Not found!', err);
      console.log('Value =')
      console.log(value);
    })
  }


function getBlockHeight() {
    let i = 0;
    db.createReadStream().on('data', function(data) {
        i++;
    }).on('error', function(err) {
        return console.log('Unable to read data stream!', err)
    }).on('close', function() {
        console.log(i)
    })

    return i
}