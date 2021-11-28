import * as React from 'react';
import b_ from 'b_';

import './index.scss';

const b = b_.with('slider-edit-grid');

const range = (n: number) => (new Array(n)).fill(0).map((_, i) => i);

export const Grid: React.FC = () =>
  <div className={b()}>
    <table>
      <tbody>
        {range(3).map(i => (<tr key={i}>{range(3).map(j => <td key={`${i}_${j}`}/>)}</tr>))}
      </tbody>
    </table>
  </div>