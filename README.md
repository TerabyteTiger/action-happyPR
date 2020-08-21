# Happy PR ✨

This action uses [sentiment](https://www.npmjs.com/package/sentiment) to analyze the sentiment of an incoming PR and responds with a gif and score from -5 to 5.

While this could have real-world uses, in it's current state it's very much just for fun 😀

## Inputs

### `GITHUB_TOKEN`

**Required** This is an auto-generated token that allows Happy PR to respond as the GitHub action bot.

## Outputs

An example of a response to a somewhat positive Pull Request response:

![Github comment stating 'You're pull request scored a 1.167 out of a possible 5 on the sentiment scale with a gif of Sonic dancing](./SampleComment.png)

## Example usage

```yaml
on:
  pull_request:
    types: [opened]
    
uses: TerabyteTiger/action-happyPR@v2
  id: happy
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This is for triggering the action and testing purposes  
