var a = Object.defineProperty;
var w = (r, s, t) => s in r ? a(r, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[s] = t;
var n = (r, s, t) => w(r, typeof s != "symbol" ? s + "" : s, t);
const g = Symbol("newline"), u = Symbol("blank");
class l {
  constructor(s, t = "", e = 1, i = 1, o = 1) {
    /**
     * The name of the token.
     * 
     * @type {Symbol}
     */
    n(this, "name");
    /**
     * The value of the token.
     * 
     * @type {string}
     */
    n(this, "value");
    /**
     * The line number of the token.
     * 
     * @type {number}
     */
    n(this, "line");
    /**
     * The start position of the token.
     * 
     * @type {number}
     */
    n(this, "start");
    /**
     * The end position of the token.
     * 
     * @type {number}
     */
    n(this, "end");
    this.name = s, this.value = t, this.line = e, this.start = i, this.end = o;
  }
  /**
   * Returns the length of the token's value.
   * 
   * @returns {number} The length of the value string.
   */
  get length() {
    return this.value.length;
  }
}
class d extends Array {
  /**
   * Appends the given string to the latest text node in the stack.
   * If the stack is empty or the latest token is not a text node,
   * a new text node is created. The cursor position is updated
   * as well.
   *
   * @param {string} text - The text to append
   */
  pushToLatestTextNode(s) {
    let t = this[this.length - 1];
    t ? (t == null ? void 0 : t.name) !== u ? this.push(
      t = new l(
        u,
        "",
        t.line,
        t.ends,
        t.ends
      )
    ) : t.end += s.length : this.push(
      t = new l(u)
    ), t.value += s;
  }
  /**
   * Adds a token to the stack and returns the new
   * length of the stack.
   *
   * @param {Token} token The token to add.
   * @returns {number} The stack itself.
   */
  push(s) {
    const t = this[this.length - 1];
    return t && (s.start = t.end, s.line = t.line + s.value.split(`
`).length - 1, s.end = s.start + s.value.length), super.push(s);
  }
}
var m = Object.defineProperty, f = (r, s, t) => s in r ? m(r, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[s] = t, h = (r, s, t) => f(r, typeof s != "symbol" ? s + "" : s, t);
class b {
  /**
   * Initialize the stream.
   * 
   * @param {string} raw string data to get streamed
   */
  constructor(s) {
    h(this, "BEGINNING", Symbol("beginning")), h(this, "ENDING", Symbol("ending")), h(this, "raw", ""), h(this, "cursor", 0), this.raw = s;
  }
  /**
   * Get the current character.
   * 
   * @type {string|undefined}
   */
  get current() {
    return this.raw[this.cursor];
  }
  /**
   * Returns the next character in the stream and advances the cursor.
   *
   * @type {string|undefined}
   */
  get next() {
    return this.raw[++this.cursor];
  }
  /**
   * Returns the previous character in the stream and decrements the cursor.
   *
   * @type {string}
   */
  get prev() {
    return this.raw[--this.cursor];
  }
  /**
   * Checks if the given needle matches starting from the current
   * position.
   * 
   * ```js
   * // v  <-- cursor is here
   * "lorem ipsum".matches( "rem" ); // true
   * ```
   * 
   * @param {string} needle a string to check
   * @returns {boolean}
   */
  matches(s) {
    return this.raw.slice(
      this.cursor,
      this.cursor + s.length
    ) === s;
  }
  /**
   * Checks if the given needle matches before the current position.
   * 
   * ```js
   * //   v  <-- cursor is here
   * "lorem ipsum".before( "lore" ); // true
   * ```
   * 
   * @param {string} needle a string to check
   * @returns {boolean}
   */
  before(s) {
    return this.raw.slice(
      this.cursor - s.length,
      this.cursor
    ) === s;
  }
  /**
   * Checks if the given needle matches after the current position.
   * 
   * ```js
   * // v  <-- cursor is here
   * "lorem ipsum".after( "em" ); // true
   * ```
   *
   * @param {string} needle a string to check
   * @returns {boolean}
   */
  after(s) {
    return this.raw.slice(
      this.cursor + 1,
      this.cursor + s.length + 1
    ) === s;
  }
  /**
   * Calculates there are how many characters between the current
   * position and the specified needle in the stream.
   * 
   * If the needle is not found, Infinity will be returned.
   * 
   * ```js
   * // v  <-- cursor is here
   * "lorem ipsum".distanceTo( "p" ); // 4
   * ```
   * 
   * It also supports the "beginning" and "ending" symbols.
   * 
   * ```js
   * //   v  <-- cursor is here
   * "lorem ipsum".distanceTo( stream.BEGINNING ); // 4
   * "lorem ipsum".distanceTo( stream.ENDING ); // 6
   * ```
   * 
   * @param {string|Symbol} needle - The string to search for in the
   * stream or the symbol "beginning" or "ending".
   * @returns {number} The index representing the distance to the needle.
   */
  distanceTo(s) {
    const t = s === this.BEGINNING ? this.cursor : s === this.ENDING ? this.raw.length - this.cursor - 1 : this.raw.indexOf(
      s,
      this.cursor
    ) - this.cursor - 1;
    return t < 0 ? 1 / 0 : t;
  }
  /**
   * Returns an array of arrays, where each inner array contains a
   * needle and its distance to the current position in the stream.
   * 
   * The returned array is sorted in ascending order based on the distance.
   *
   * @param {Array<string>} needles - An array of needles to find the closest match for.
   * @returns {[string, number][]}
   */
  closest(s) {
    return s.map(
      (t) => [t, this.distanceTo(t)]
    ).sort(
      (t, e) => t[1] - e[1]
    );
  }
  /**
   * Starts a transaction and returns a rollback function.
   *
   * @returns {Function} The rollback function that resets the cursor.
   */
  startTransaction() {
    const { cursor: s } = this;
    function t() {
      this.cursor = s;
    }
    return t.bind(this);
  }
  /**
   * Returns a substring from the current cursor position to the first
   * occurrence of `target`.
   * 
   * If the target is not found, it returns `undefined`.
   *
   * ```js
   * // v  <-- cursor is here
   * "lorem ipsum".getUntil( " " ); // "rem"
   * //    ^  <-- cursor is here now
   * ```
   * 
   * @param {string} target - The string to search for in stream.
   * @returns {string|undefined}
   */
  getUntil(s) {
    const t = this.raw.indexOf(s, this.cursor);
    if (t === -1)
      return;
    const e = this.raw.slice(this.cursor, t);
    return this.cursor += e.length, e;
  }
  /**
   * Slices a portion from the current position of the stream to the
   * given `length`.
   * 
   * ```js
   * // v  <-- cursor is here
   * "lorem ipsum".slice( 3 ); // "rem"
   * //    ^  <-- cursor is here now
   * ```
   *
   * @param {number} length - The length for slicing.
   * @throws {RangeError} when `length` is negative
   * @returns {string} The sliced portion of the raw data.
   */
  slice(s) {
    if (s < 0)
      throw new RangeError(
        `Cannot slice backwards from ${this.cursor} to ${s}.`
      );
    const t = this.raw.slice(
      this.cursor,
      this.cursor + s
    );
    return this.cursor = s === 1 / 0 ? this.raw.length : this.cursor + s, t;
  }
  /**
   * Moves the cursor by the specified length from the current position.
   *
   * ```js
   * //   v  <-- cursor is here
   *   "lorem ipsum".move( 2 );
   * //     ^  <-- cursor is here now
   * ```
   * 
   * @param {number} length - The amount by which to move the cursor.
   * @returns {this}
   */
  move(s) {
    return this.cursor += s, this;
  }
  /**
   * Sets the cursor to the specified position.
   *
   * ```js
   * //   v  <-- cursor is here
   *   "lorem ipsum".moveTo( 1 );
   * //  ^  <-- cursor is here now
   * ```
   * 
   * @param {number} position - The new cursor position.
   * @returns {this}
   */
  moveTo(s) {
    return this.cursor = s, this;
  }
  /**
   * Finds the index of the target in the stream starting from the
   * current cursor position and move the cursor to that position.
   *
   * @param {string} target - The string to search for in the stream.
   * @returns {number} The index of the target in the stream.
   */
  jumpTo(s) {
    return this.cursor = this.raw.indexOf(
      s,
      this.cursor
    );
  }
  /**
   * It eats the given target character set(s) starting from the position
   * of the cursor in the stream until it encounters something else.
   * 
   * The consumed data will be returned.
   *
   * ```js
   * //  v  <-- cursor is here
   * "fooooo ipsum".consume( "o" ); // ooo
   * //     ^  <-- cursor is here now
   * ```
   * 
   * It supports multibyte character targets.
   * 
   * ```js
   * //     v  <-- cursor is here
   * "Lorem 12 12 12 ipsum".consume( "12 " ); // 12 12 12 
   * //              ^  <-- cursor is here now
   * ```
   * 
   * It supports more than one target. With this, it will consume
   * if the characters at the reached position matches with any of
   * the given targets.
   * 
   * ```js
   * //    v  <-- cursor is here
   * "Lorem\s\t\t\s\sipsum".consume([ "\s", "\t" ]); // \s\t\t\s\s
   * //              ^  <-- cursor is here now
   * ```
   * 
   * @param {string|string[]} target - The string(s) to search for in the stream.
   * @returns {string}
   */
  consume(s) {
    let t;
    const e = this.cursor;
    for (Array.isArray(s) || (s = [s]); (t = s.findIndex((i) => this.matches(i))) > -1; )
      this.move(s[t].length);
    return this.raw.slice(e, this.cursor);
  }
}
function N(r, s) {
  const t = new d(), e = new b(r);
  do {
    let i;
    for (const [o, c] of s)
      e.matches(c) && (i = new l(), i.name = o, i.value = c, t.push(i), e.cursor += c.length - 1);
    i || t.pushToLatestTextNode(e.current);
  } while (e.next !== void 0);
  return t;
}
const p = Symbol("space"), v = Symbol("exclamation");
console.log(
  N(
    "hello world!",
    [
      [p, " "],
      [Symbol("double asterix"), "**"],
      [g, `
`],
      [v, "!"]
    ]
  )
);
