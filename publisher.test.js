const Publisher = require('./publisher.js');

const p = new Publisher();

class LogPublisher extends Publisher {
	debug() {
		this.notify('debug', ...arguments);
	}
	info() {
		this.notify('info', ...arguments);
	}
	log() {
		this.notify('log', ...arguments);
	}
	warn() {
		this.notify('warn', ...arguments);
	}
	error() {
		this.notify('error', ...arguments);
	}
	fail() {
		this.notify('fail', ...arguments);
	}
}


const consoleSubscriber = {
		ondebug: console.debug,
		oninfo:  console.info,
		onlog:   console.log,
		onwarn:  console.warn,
		onerror: console.error,
		onfail:  console.fail
	}, 
	delayedSubscriber = {
		later: function(){
			setTimeout(()=>{
				console.log.call(console, 'Some time later: ', ...arguments);
			}, 1000);
		},
		ondebug: function(){this.later(...arguments)},
		oninfo:  function(){this.later(...arguments)},
		onlog:   function(){this.later(...arguments)},
		onwarn:  function(){this.later(...arguments)},
		onerror: function(){this.later(...arguments)},
		onfail:  function(){this.later(...arguments)}
	};

const logger = new LogPublisher()
	.subscribe(consoleSubscriber)
	.subscribe(delayedSubscriber);

logger.debug('A debug log');
logger.info('An info log');
