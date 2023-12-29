import { openai } from './openai.js';
import { Document } from 'langchain/document';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube';

const question = process.argv[2] || 'hi';
const video = `https://www.youtube.com/watch?v=zR_iuq2evXo`;

const createStore = docs =>
  MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

const docsFromYTVideo = async video => {
  const loader = YoutubeLoader.fromUrl(video, {
    language: 'en',
    addVideoInfo: true,
  });
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: '  ',
      chunkSize: 2500,
      chunkOverlap: 100,
    })
  );
};

const docsFromPDF = () => {
  const loader = new PDFLoader('xbox.pdf');
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: '.   ',
      chunkSize: 2500,
      chunkOverlap: 200,
    })
  );
};

const loadStore = async () => {
  const videoDocs = await docsFromYTVideo(video);
  const pdfDocs = await docsFromPDF();

  return createStore([...videoDocs, ...pdfDocs]);
};
