var m = Object.defineProperty;
var d = (e, t, s) => t in e ? m(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var h = (e, t, s) => d(e, typeof t != "symbol" ? t + "" : t, s);
const E = Symbol("space"), I = Symbol("exclamation"), S = Symbol("newline"), p = Symbol("blank");
class l {
  constructor(t, s = "", r = 1, i = 1, n = 1) {
    /**
     * The name of the token.
     * 
     * @type {Symbol}
     */
    h(this, "name");
    /**
     * The value of the token.
     * 
     * @type {string}
     */
    h(this, "value");
    /**
     * The line number of the token.
     * 
     * @type {number}
     */
    h(this, "line");
    /**
     * The start position of the token.
     * 
     * @type {number}
     */
    h(this, "start");
    /**
     * The end position of the token.
     * 
     * @type {number}
     */
    h(this, "end");
    this.name = t, this.value = s, this.line = r, this.start = i, this.end = n;
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
function w(e) {
  return e.split(`
`).length;
}
class b extends Array {
  /**
   * Gets the first token from the stack.
   * 
   * @returns {Token}
   */
  get first() {
    return this[0];
  }
  /**
   * Gets the last token from the stack.
   * 
   * @returns {Token}
   */
  get latest() {
    return this[this.length - 1];
  }
  /**
   * Appends the given string to the latest text node in the stack.
   * If the stack is empty or the latest token is not a text node,
   * a new text node is created. It returns the latest token.
   *
   * @param {string} text - The text to append
   * @param {string|Symbol} nodeName - The name of the node
   * @returns {Token}
   */
  pushToLatestNode(t, s) {
    let r = this[this.length - 1];
    if (!r)
      this.push(
        // create a new text node
        r = new l(
          s,
          t,
          1,
          1,
          (t || "").length
        )
      );
    else if (r.name !== s)
      this.push(
        // create a new text node
        r = new l(
          s,
          t,
          r.line,
          r.start + 1,
          (t || "").length
        )
      );
    else if (r.name === s) {
      const i = w(t) - 1;
      r.value += t, r.end += t.length, i > 0 && (r.line += i);
    }
    return r;
  }
  /**
   * Adds a token to the stack and returns the new length of
   * the stack.
   *
   * @param {Token} token The token to add.
   * @returns {number}
   */
  push(t) {
    const s = this[this.length - 1];
    return s && (t.start = s.end + 1, t.end = t.start + t.value.length - 1, t.line = s.line + w(t.value) - 1), super.push(t);
  }
  /**
   * Converts the stack of tokens into a single string by
   * concatenating the values of each token.
   *
   * @returns {string} The concatenated string of token values.
   */
  toString() {
    return this.map((t) => t.value).join("");
  }
}
var v = Object.defineProperty, N = (e, t, s) => t in e ? v(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, c = (e, t, s) => N(e, typeof t != "symbol" ? t + "" : t, s);
class y {
  /**
   * Initialize the stream.
   * 
   * @param {string} raw string data to get streamed
   */
  constructor(t) {
    c(this, "BEGINNING", Symbol("beginning")), c(this, "ENDING", Symbol("ending")), c(this, "raw", ""), c(this, "cursor", 0), this.raw = t;
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
  matches(t) {
    return this.raw.slice(
      this.cursor,
      this.cursor + t.length
    ) === t;
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
  before(t) {
    return this.raw.slice(
      this.cursor - t.length,
      this.cursor
    ) === t;
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
  after(t) {
    return this.raw.slice(
      this.cursor + 1,
      this.cursor + t.length + 1
    ) === t;
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
  distanceTo(t) {
    const s = t === this.BEGINNING ? this.cursor : t === this.ENDING ? this.raw.length - this.cursor - 1 : this.raw.indexOf(
      t,
      this.cursor
    ) - this.cursor - 1;
    return s < 0 ? 1 / 0 : s;
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
  closest(t) {
    return t.map(
      (s) => [s, this.distanceTo(s)]
    ).sort(
      (s, r) => s[1] - r[1]
    );
  }
  /**
   * Starts a transaction and returns a rollback function.
   *
   * @returns {Function} The rollback function that resets the cursor.
   */
  startTransaction() {
    const { cursor: t } = this;
    function s() {
      this.cursor = t;
    }
    return s.bind(this);
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
  getUntil(t) {
    const s = this.raw.indexOf(t, this.cursor);
    if (s === -1)
      return;
    const r = this.raw.slice(this.cursor, s);
    return this.cursor += r.length, r;
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
  slice(t) {
    if (t < 0)
      throw new RangeError(
        `Cannot slice backwards from ${this.cursor} to ${t}.`
      );
    const s = this.raw.slice(
      this.cursor,
      this.cursor + t
    );
    return this.cursor = t === 1 / 0 ? this.raw.length : this.cursor + t, s;
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
  move(t) {
    return this.cursor += t, this;
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
  moveTo(t) {
    return this.cursor = t, this;
  }
  /**
   * Finds the index of the target in the stream starting from the
   * current cursor position and move the cursor to that position.
   *
   * @param {string} target - The string to search for in the stream.
   * @returns {number} The index of the target in the stream.
   */
  jumpTo(t) {
    return this.cursor = this.raw.indexOf(
      t,
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
  consume(t) {
    let s;
    const r = this.cursor;
    for (Array.isArray(t) || (t = [t]); (s = t.findIndex((i) => this.matches(i))) > -1; )
      this.move(t[s].length);
    return this.raw.slice(r, this.cursor);
  }
}
function A(e, t, { mergeTokens: s = !1 } = {}) {
  const r = new b(), i = new y(e);
  do {
    let n;
    t: for (let [a, u, { merge: g } = {}] of t) {
      let f = s;
      typeof u == "string" && (u = [u]), g !== void 0 && (f = g);
      for (const o of u)
        if (i.matches(o)) {
          f ? n = r.pushToLatestNode(o, a) : (n = new l(a, o), n.end = i.cursor + o.length, r.push(n)), i.cursor += o.length - 1;
          break t;
        }
    }
    n || r.pushToLatestNode(i.current, p);
  } while (i.next !== void 0);
  return r;
}
export {
  p as BLANK,
  I as EXCLAMATION,
  S as NEWLINE,
  E as SPACE,
  A as tokenize
};
