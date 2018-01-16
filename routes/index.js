const mysql = require('mysql');
var db = mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'blog'});
/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
// http://www.egtch.com/archives/549
exports.banner = function(req, res){
  console.log(req.query);
  var init_page =1;
  var num = 2;
  if(req.query.page){
    init_page = req.query.page
  }
  var start = 0; //起始数据
  if(init_page>1){
    start = (init_page-1)*num;//页码减去1，乘以条数就得到分页的起始数了
  }
  let sql = 'SELECT title FROM banner_table limit '+start+','+num
  db.query(sql, function (err, data) {
  
    if(err){
        res.status(500).send('服务器错误').end()
    }else {
        console.log(data)
        res.send(data);
        // res.render('index', {title:data});
    }
})
};
