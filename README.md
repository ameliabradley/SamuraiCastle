SamuraiCastle
=============
Hex game where you compete with others to build an empire

Finished
=============
- Basic map rendering

TODO
=============
- Add AI
- Add gameplay mechanics
- Add unfair map detection ANN
  - Inputs
    - X,Y coordinates of each hex
  - Outputs
    - Fairness score for the given map
  - Constraints
    - Based on the ability of the fair map generation ANN to produce a fair map, given this tile set
- Add fair map generation ANN
  - Inputs
    - X,Y coordinates of each hex
  - Outputs
    - For each player
      - Initial location of each base
      - Initial location of starting pawns
      - Initial tiles belonging to player
    - Initial hexes that need clearing before use
  - Constraints
    - Generation must lead to games that are difficult for sophisticated AI to win
      - Introduce imperfection into AI in case of stalemates?
    - Generation must be available for 2 to max (6?) number of players
      - Multiple ANNs?
