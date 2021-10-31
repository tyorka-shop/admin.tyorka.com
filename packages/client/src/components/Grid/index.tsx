import * as React from 'react';
import * as b_ from 'b_';

import './index.scss';

const b = b_.with('slider-edit-grid');

const range = (n: number) => (new Array(n)).fill(0).map((_, i) => i);

export const Grid: React.FC = () =>
  <div className={b()}>
    <table>
      <tbody>
        {range(3).map(i => (<tr>{range(3).map(j => <td />)}</tr>))}
      </tbody>
    </table>
  </div>