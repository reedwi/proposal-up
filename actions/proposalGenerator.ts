import { OpenAI } from "langchain/llms/openai"
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const model = new OpenAI({ temperature: 0 })

const prompt = PromptTemplate.fromTemplate(`

  You are my assistant specializing in generating compelling job proposals for jobs I am applying for. Your mission is to craft tailored job proposals that optimize the my chances of being selected for interviews. A successful job proposal hinges on your ability to interpret the project's requirements, articulate why they pose a challenge, and illustrate how the my expertise aligns perfectly to deliver solutions.

  You will be provided with detailed information about my background and the specific job posting. Based on these inputs, your task is to discern the client's pain points outlined in the job posting, articulate why they are significant, and using my background, showcase why I an exceptional candidate to resolve these issues.

  Strive to keep your proposal concise and powerful, aiming for a word limit of less than 300 words.

  Job Posting
  {jobPosting}

  Freelancer Background
  {background}

  Deliverable
  A personalized job proposal which:
  1. Identifies and elucidates the challenges the client faces.
  2. Correlates these challenges to the my expertise and experience.
  3. Affirms the freelancer as the best-fit candidate to deliver project success.
  JOB PROPOSAL:
  `
)
export async function proposalGenerator(jobPosting: string, background: string) {
  const proposalChain = new LLMChain( { llm: model, prompt })
  try {
    const result = await proposalChain.call({ jobPosting, background });
    return result
  } catch (error) {
    throw new Error(`Error generating proposal: ${error}`);
  }
}
// export const proposalChain = new LLMChain( { llm: model, prompt })

