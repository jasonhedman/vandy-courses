import { test, expect} from "@jest/globals";

import {voteComment} from "../comment";

test('votes on a comment with an invalid reviewId', async () => {
    expect(await voteComment("", "", 0)).toBe(false);
});