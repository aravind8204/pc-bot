// const {OpenAI}= require("openai");

// const openai = new OpenAI({
//     apiKey: "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",
//   });

// const completion = openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     store: true,
//     messages: [
//       {"role": "user", "content": "i want to create a insurance policy"},
//     ],
//   });
  
//   completion.then((result) => console.log(result.choices[0].message));



const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  await nlp.addCorpus('./nlp-dataset.json');
  await nlp.train();
  const response = await nlp.process('en', 'i am aravind');
  console.log(response.answers[0].answer);
})();