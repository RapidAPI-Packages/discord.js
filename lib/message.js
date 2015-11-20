"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PMChannel = require("./PMChannel.js");
var Embeddable = require("./Embeds/IEmbed.js");

var Message = (function () {
	function Message(data, channel, mentions, author) {
		_classCallCheck(this, Message);

		this.tts = data.tts;
		this.timestamp = Date.parse(data.timestamp);
		this.nonce = data.nonce;
		this.mentions = mentions;
		this.everyoneMentioned = data.mention_everyone;
		this.id = data.id;
		this.embeds = [];
		if (data.embeds) {
			for (var _iterator = data.embeds, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;

				if (_isArray) {
					if (_i >= _iterator.length) break;
					_ref = _iterator[_i++];
				} else {
					_i = _iterator.next();
					if (_i.done) break;
					_ref = _i.value;
				}

				var embed = _ref;

				this.embeds.push(Embeddable.createEmbed(embed));
			}
		}

		this.editedTimestamp = data.edited_timestamp;
		this.content = data.content.trim();
		this.channel = channel;

		if (this.isPrivate) {
			this.author = this.channel.client.getUser("id", author.id);
		} else {
			this.author = this.channel.server ? this.channel.server.getMember("id", author.id) : this.channel.client.getUser("id", author.id);
		}

		this.attachments = data.attachments;
	}

	/*exports.Message.prototype.isPM = function() {
 	return ( this.channel instanceof PMChannel );
 }*/

	Message.prototype.isMentioned = function isMentioned(user) {
		var id = user.id ? user.id : user;
		for (var _iterator2 = this.mentions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
			var _ref2;

			if (_isArray2) {
				if (_i2 >= _iterator2.length) break;
				_ref2 = _iterator2[_i2++];
			} else {
				_i2 = _iterator2.next();
				if (_i2.done) break;
				_ref2 = _i2.value;
			}

			var mention = _ref2;

			if (mention.id === id) {
				return true;
			}
		}
		return false;
	};

	_createClass(Message, [{
		key: "sender",
		get: function get() {
			return this.author;
		}
	}, {
		key: "isPrivate",
		get: function get() {
			return this.channel.isPrivate;
		}
	}]);

	return Message;
})();

module.exports = Message;