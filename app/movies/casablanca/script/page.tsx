import { MovieWorkspaceHeader } from '@/components/MovieWorkspaceHeader';
import { ep001Script } from '@/lib/produxion';

export default function ScriptPage(){
  return <div className="movieWorkspace page">
    <MovieWorkspaceHeader active="Script"/>
    <section className="workspaceIntro"><div><span className="eyebrow accent">MASTER SCRIPT</span><h2>EP001 • Order Terakhir</h2></div><p>Script view mengikat dialogue, action, location, story clock, props, camera, audio, horror level, dan continuity note ke scene ID yang sama dengan storyboard.</p></section>
    <div className="scriptSceneList">
      {ep001Script.map((scene,index)=><article className="scriptScene" key={scene.sceneId}>
        <header className="scriptSceneHeader"><div><span className="sceneNumber">{String(index+1).padStart(2,'0')}</span><span className="eyebrow">{scene.sceneId}</span><h3>{scene.title}</h3></div><span className={`horror horror-${scene.horror.toLowerCase()}`}>{scene.horror}</span></header>
        <div className="scriptMetaGrid"><div><span>VIDEO TIME</span><strong>{scene.timecode}</strong></div><div><span>STORY CLOCK</span><strong>{scene.storyClock}</strong></div><div><span>SITE</span><strong>{scene.siteId}</strong><small>{scene.siteName}</small></div><div><span>ENVIRONMENT</span><strong>{scene.environmentId}</strong></div><div><span>CHARACTERS</span><strong>{scene.characters.join(', ')}</strong></div><div><span>CAMERA</span><strong>{scene.camera}</strong></div></div>
        <div className="scriptBodyGrid">
          <section className="scriptAction"><span className="eyebrow">SCENE PURPOSE</span><p>{scene.purpose}</p><span className="eyebrow">ACTION / ADEGAN</span><p>{scene.action}</p><span className="eyebrow">PRODUCTION NOTE</span><p>{scene.productionNote}</p></section>
          <section className="dialoguePanel"><span className="eyebrow">DIALOGUE / CONVERSATION</span>{scene.dialogue.length?scene.dialogue.map((line,i)=><div className="dialogueLine" key={`${scene.sceneId}-${i}`}><strong>{line.speaker}</strong><p>{line.text}</p>{line.note&&<small>{line.note}</small>}</div>):<div className="noDialogue">No dialogue • visual storytelling only</div>}</section>
        </div>
        <footer className="scriptFooter"><div><span>AUDIO</span><strong>{scene.audio}</strong></div><div><span>PROPS</span><strong>{scene.props.join(', ')}</strong></div><div><span>CONTINUITY</span><strong>{scene.continuity}</strong></div></footer>
      </article>)}
    </div>
  </div>;
}
