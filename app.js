import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import noirjs_demo from './circuit/target/noirjs_demo.json';

document.addEventListener('DOMContentLoaded', async () => {

  const oracles = async (name, args) => {
    console.log("call oracles");
    if (name == "get_storage") {
        return Promise.resolve(["0x1"])
    }
    return Promise.reject("Unknown oracle");
 }

  const backend = new BarretenbergBackend(noirjs_demo);
  const noir = new Noir(noirjs_demo, backend);
  const input = { x: 1 };
  display('logs', 'Generating proof... ⌛');
  const proof = await noir.generateFinalProof(input, oracles);
  display('logs', 'Generating proof... ✅');
  display('results', proof.proof);
  display('logs', 'Verifying proof... ⌛');
  const verification = await noir.verifyFinalProof(proof);
  if (verification) display('logs', 'Verifying proof... ✅');
});

function display(container, msg) {
  const c = document.getElementById(container);
  const p = document.createElement('p');
  p.textContent = msg;
  c.appendChild(p);
}
