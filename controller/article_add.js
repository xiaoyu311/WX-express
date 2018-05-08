export default (req, res, next) => {
  console.log(req.body)
  res.send({one: 'one'});
}