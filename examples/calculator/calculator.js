'use strict';

/**
 * Module dependencies.
 */

var Vorpal = require('./../../lib/vorpal');

/**
 * Variable declarations.
 */

var vorpal = new Vorpal();

vorpal.command('say <words>', 'say something')
  .action(function (args, cb) {
    this.log(args.words);
    cb();
  });

vorpal.command('reverse [words]', 'append bar to stdin')
  .alias('r')
  .action(function (args, cb) {
    var stdin = args.stdin || args.words;
    stdin = String(stdin).split('').reverse().join('');
    this.log(stdin);
    cb();
  });

vorpal.command('array [string]', 'convert string to an array.')
  .action(function (args, cb) {
    var stdin = args.stdin || args.string;
    stdin = String(stdin).split('');
    this.log(stdin);
    cb();
  });

vorpal.command('do [text...]', 'Recite')
  .alias('addition')
  .alias('plus')
  .autocompletion(function (text, iteration, cb) {
    cb(undefined, 'do ' + text + ' re');
  })
  .action(function (args, cb) {
    var result = this.match('r', ['red', 'reset']);
    this.log(result);
    cb();
  });

vorpal.command('add [numbers...]', 'Adds numbers together')
  .alias('addition')
  .alias('plus')
  .action(function (args, cb) {
    var numbers = args.numbers;
    var sum = 0;
    for (var i = 0; i < numbers.length; ++i) {
      sum += parseFloat(numbers[i]);
    }
    this.log(sum);
    cb(undefined, sum);
  });

vorpal.command('double [values...]', 'Doubles a value on each tab press')
  .autocompletion(function (text, iteration, cb) {
    if (iteration > 1000000) {
      cb(undefined, ['cows', 'hogs', 'horses']);
    } else {
      var number = String(text).trim();
      if (!isNaN(number)) {
        number = (number < 1) ? 1 : number;
        cb(undefined, 'double ' + number * 2);
      } else {
        cb(undefined, 'double 2');
      }
    }
  })
  .action(function (args, cb) {
    cb();
  });

vorpal.command('args [items...]', 'Shows args.')
  .option('-d')
  .option('-a')
  .option('--save')
  .action(function (args, cb) {
    this.log(args);
    cb();
  });

vorpal
  .mode('repl', 'Enters REPL Mode.')
  .init(function (args, cb) {
    this.log('Entering REPL Mode.');
    cb();
  })
  .action(function (command, cb) {
    console.log(command);
    var res = eval(command);
    this.log(res);
    cb(res);
  });

vorpal
  .delimiter('calc:')
  .show()
  .parse(process.argv);