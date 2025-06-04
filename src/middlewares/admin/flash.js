const format = require("util").format;

const flash = (options) => {
  options = options || {};
  const safe = options.unsafe === undefined ? true : !options.unsafe;
  // Nếu không truyền unsafe, thì safe = true (an toàn, không ghi đè req.flash nếu nó đã tồn tại).
  // Nếu unsafe = true, thì safe = false, nghĩa là chấp nhận ghi đè.
  return function (req, res, next) {
    if (req.flash && safe) {
      return next();
    }
    req.flash = _flash;
    next();
  };
};

function _flash(type, msg, ...args) {
  if (this.session === undefined) throw Error("req.flash() requires sessions");
  const msgs = (this.session.flash = this.session.flash || {});
  // console.log(this.url, this.session.flash);
  // Kiểm tra và khởi tạo this.session.flash nếu chưa tồn tại
  // msgs và this.session.flash cùng tham chiếu đến cùng 1 object nên thay đổi msgs cũng là thay đổi this.session.flash
  if (type && msg) {
    if (args.length > 0 && format) {
      msg = format(msg, ...args);
      //  format: là util.format, giúp thay thế %s, %d, v.v. (giống printf trong C).
      // args = ['Hello %s!', 'John']
      // msg = 'Hello John!'
    } else if (Array.isArray(msg)) {
      msg.forEach((val) => {
        (msgs[type] = msgs[type] || []).push(val);
      });
      return msgs;
    }
    (msgs[type] = msgs[type] || []).push(msg);
    return msgs;
  } else if (type) {
    const messages = msgs[type];
    delete msgs[type];
    return { [type]: messages };
  } else {
    return msgs;
  }
}

module.exports = flash;
