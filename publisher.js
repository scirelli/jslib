module.exports = class Publisher {
	constructor() {
		this.subscribers = [];
	}

	subscribeType(eventType, subscriber) {
		if(!subscriber['on' + eventType]) {
			throw new Error('Not a valid subscriber');
		}
		this.subscribers.push(subscriber);
		return this;
	}
	subscribe(subscriber) {
		this.subscribers.push(subscriber);
		return this;
	}
	unsubscribe(subscriber) {
		this.subscribers = this.subscribers.filter(s=>{
			return s != subscriber;
		});
		return this;
	}

	notify(eventType) {
		let args = Array.prototype.slice.call(arguments, 1);
		this.subscribers.forEach(s => {
			if(s['on' + eventType]){
				s['on' + eventType].apply(s, args);
			}
		});
		return this;
	}
}
