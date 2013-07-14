///<reference path="../entities/Entity.ts" />
///<reference path="../pick/IPicker.ts" />
///<reference path="../pick/PickingCollisionVO.ts" />
///<reference path="../containers/View3D.ts" />
///<reference path="../geom/Vector3D.ts" />
///<reference path="../errors/PartialImplementationError.ts" />

//<reference path="../display3D/Program3D.ts" />
//<reference path="../display3D/Context3D.ts" />
//<reference path="../display3D/TextureBase.ts" />
//<reference path="../display/BitmapData.ts" />
//<reference path="../base/IRenderable.ts" />

//<reference path="../geom/Point.ts" />
//<reference path="../geom/Matrix3D.ts" />
//<reference path="../geom/Rectangle.ts" />
//<reference path="../math/Matrix3DUtils.ts" />


module away.pick
{
	//import flash.geom.Vector3D;
	
	//import away3d.arcane;
	//import away3d.containers.Scene3D;
	//import away3d.containers.View3D;
	//import away3d.core.data.EntityListItem;
	//import away3d.core.traverse.EntityCollector;
	//import away3d.core.traverse.RaycastCollector;
	//import away3d.entities.Entity;
	
	//use namespace arcane;
	
	/**
	 * Picks a 3d object from a view or scene by 3D raycast calculations.
	 * Performs an initial coarse boundary calculation to return a subset of entities whose bounding volumes intersect with the specified ray,
	 * then triggers an optional picking collider on individual entity objects to further determine the precise values of the picking ray collision.
	 */

    // TODO: Dependencies needed to before implementing IPicker - EntityListItem, EntityCollector
	export class RaycastPicker implements away.pick.IPicker
	{
		private _findClosestCollision:boolean;
		//private var _raycastCollector:RaycastCollector = new RaycastCollector(); // TODO Implement Dependency: RaycastCollector
		private _ignoredEntities = [];
		private _onlyMouseEnabled:boolean = true;
		
		private _entities:away.entities.Entity[];//Vector.<Entity>;
		private _numEntities:number;
		private _hasCollisions:boolean;
		
		/**
		 * @inheritDoc
		 */
		public get onlyMouseEnabled():boolean
		{
			return this._onlyMouseEnabled;
		}
		
		public set onlyMouseEnabled(value:boolean)
		{
			this._onlyMouseEnabled = value;
		}
		
		/**
		 * Creates a new <code>RaycastPicker</code> object.
		 *
		 * @param findClosestCollision Determines whether the picker searches for the closest bounds collision along the ray,
		 * or simply returns the first collision encountered Defaults to false.
		 */
		constructor(findClosestCollision:boolean)
		{
			
			this._findClosestCollision = findClosestCollision;
            this._entities = new Array<away.entities.Entity>();//Vector.<Entity>();
		}
		
		/**
		 * @inheritDoc
		 */

        //TODO Implement Dependency: EntityListItem, EntityCollector
		public getViewCollision(x:number, y:number, view:away.containers.View3D):away.pick.PickingCollisionVO
		{
            throw new away.errors.PartialImplementationError( 'EntityListItem, EntityCollector');
            return null;
            /*
			//cast ray through the collection of entities on the view
			var collector:EntityCollector = view.entityCollector;
			//var i:number;
			
			if (collector.numMouseEnableds == 0)
				return null;
			
			//update ray
			var rayPosition:away.geom.Vector3D = view.unproject(x, y, 0);
			var rayDirection:away.geom.Vector3D = view.unproject(x, y, 1);
			rayDirection = rayDirection.subtract(rayPosition);
			
			// Perform ray-bounds collision checks.
			this._numEntities = 0;
			var node:EntityListItem = collector.entityHead;
			var entity:Entity;
			while (node) {
				entity = node.entity;
				
				if (isIgnored(entity)) {
					node = node.next;
					continue;
				}
				
				// If collision detected, store in new data set.
				if (entity.isVisible && entity.isIntersectingRay(rayPosition, rayDirection))
					_entities[_numEntities++] = entity;
				
				node = node.next;
			}
			
			//early out if no collisions detected
			if (!_numEntities)
				return null;
			
			return getPickingCollisionVO();
			*/
		}
		//*/
		/**
		 * @inheritDoc
		 */

        //* TODO Implement Dependency: EntityListItem, EntityCollector
		public getSceneCollision(position:away.geom.Vector3D, direction:away.geom.Vector3D, scene:away.containers.Scene3D):away.pick.PickingCollisionVO
		{
            throw new away.errors.PartialImplementationError( 'EntityListItem, EntityCollector');
            return null;

            /*
			//clear collector
			this._raycastCollector.clear();
			
			//setup ray vectors
            this._raycastCollector.rayPosition = position;
            this._raycastCollector.rayDirection = direction;
			
			// collect entities to test
			scene.traversePartitions(this._raycastCollector);

            this._numEntities = 0;
			var node:EntityListItem = this._raycastCollector.entityHead;
			var entity:Entity;
			while (node) {
				entity = node.entity;
				
				if (isIgnored(entity)) {
					node = node.next;
					continue;
				}
				
				_entities[_numEntities++] = entity;
				
				node = node.next;
			}
			
			//early out if no collisions detected
			if (!_numEntities)
				return null;
			
			return getPickingCollisionVO();
			*/
		}
		//*/
        /* TODO: Implement Dependency: Entity.isIntersectingRay
		public getEntityCollision(position:away.geom.Vector3D, direction:away.geom.Vector3D, entities:away.entities.Entity[] ):away.pick.PickingCollisionVO
		{


			position = position; // TODO: remove ?
			direction = direction;

			this._numEntities = 0;
			
			var entity:away.entities.Entity;
            var l : number = entities.length;


            for ( var c : number = 0 ; c < l ; c ++ )
            {

                entity = entities[c];

                if (entity.isIntersectingRay(position, direction))
                {

                    this._entities[this._numEntities++] = entity;

                }


            }

			return this.getPickingCollisionVO();

		}
		//*/
		public setIgnoreList(entities)
		{
			this._ignoredEntities = entities;
		}
		
		private isIgnored(entity:away.entities.Entity):boolean
		{
			if (this._onlyMouseEnabled && (!entity._iAncestorsAllowMouseEnabled || !entity.mouseEnabled))
            {

                return true;

            }

			
			var ignoredEntity:away.entities.Entity;

            var l : number = this._ignoredEntities.length;

            for ( var c : number = 0 ; c < l ; c ++ )
            {

                ignoredEntity = this._ignoredEntities[ c ];

                if (ignoredEntity == entity)
                {

                    return true;

                }

            }

			return false;

		}
		
		private sortOnNearT(entity1:away.entities.Entity, entity2:away.entities.Entity):number
		{
			return entity1.pickingCollisionVO.rayEntryDistance > entity2.pickingCollisionVO.rayEntryDistance? 1 : -1;
		}
		
		private getPickingCollisionVO():PickingCollisionVO
		{
			// trim before sorting
			this._entities.length = this._numEntities;
			
			// Sort entities from closest to furthest.
			this._entities = this._entities.sort(this.sortOnNearT); // TODO - test sort filter in JS
			
			// ---------------------------------------------------------------------
			// Evaluate triangle collisions when needed.
			// Replaces collision data provided by bounds collider with more precise data.
			// ---------------------------------------------------------------------
			
			var shortestCollisionDistance:number = Number.MAX_VALUE;
			var bestCollisionVO:PickingCollisionVO;
			var pickingCollisionVO:PickingCollisionVO;
			var entity:away.entities.Entity;
			var i:number;
			
			for (i = 0; i < this._numEntities; ++i) {
				entity = this._entities[i];
				pickingCollisionVO = entity._iPickingCollisionVO;
				if (entity.pickingCollider) {
					// If a collision exists, update the collision data and stop all checks.
					if ((bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) && entity.iCollidesBefore(shortestCollisionDistance, this._findClosestCollision)) {
						shortestCollisionDistance = pickingCollisionVO.rayEntryDistance;
						bestCollisionVO = pickingCollisionVO;
						if (!this._findClosestCollision) {
							this.updateLocalPosition(pickingCollisionVO);
							return pickingCollisionVO;
						}
					}
				} else if (bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) { // A bounds collision with no triangle collider stops all checks.
					// Note: a bounds collision with a ray origin inside its bounds is ONLY ever used
					// to enable the detection of a corresponsding triangle collision.
					// Therefore, bounds collisions with a ray origin inside its bounds can be ignored
					// if it has been established that there is NO triangle collider to test
					if (!pickingCollisionVO.rayOriginIsInsideBounds) {
						this.updateLocalPosition(pickingCollisionVO);
						return pickingCollisionVO;
					}
				}
			}
			
			return bestCollisionVO;
		}
		
		private updateLocalPosition(pickingCollisionVO:PickingCollisionVO)
		{

            var collisionPos:away.geom.Vector3D = ( pickingCollisionVO.localPosition == null ) ? new away.geom.Vector3D() : pickingCollisionVO.localPosition;
            //var collisionPos:away.geom.Vector3D = pickingCollisionVO.localPosition ||= new away.geom.Vector3D();

			var rayDir:away.geom.Vector3D = pickingCollisionVO.localRayDirection;
			var rayPos:away.geom.Vector3D = pickingCollisionVO.localRayPosition;
			var t:number = pickingCollisionVO.rayEntryDistance;
			collisionPos.x = rayPos.x + t*rayDir.x;
			collisionPos.y = rayPos.y + t*rayDir.y;
			collisionPos.z = rayPos.z + t*rayDir.z;
		}
		
		public dispose()
		{
		}
	}
}
