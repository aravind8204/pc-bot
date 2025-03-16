// const {OpenAI}= require("openai");

// const openai = new OpenAI({
//     your api key
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